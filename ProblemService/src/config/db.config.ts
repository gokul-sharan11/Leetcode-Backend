import mongoose from "mongoose";
import { serverConfig } from ".";

let connection: typeof mongoose | null = null;

export const connectToDB = async () => {
    if (!connection) {
        try {
            console.log("Connecting to database");
            connection = await mongoose.connect(serverConfig.DB_URL);
            mongoose.connection.on('connected', () => {
                console.log("Connected to database");
            });
            mongoose.connection.on('disconnected', () => {
                console.log("Disconnected from database");
            });
            process.on('SIGINT', async () => {
                await mongoose.connection.close();
                process.exit(0);
            })
        } catch (error) {
            mongoose.connection.on('error', (error) => {
                console.log("Error connecting to database", error);
            });
        }
    }
    return connection;
}
