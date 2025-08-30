import mongoose from "mongoose"
import { serverConfig } from "."
import logger from "./logger.config"

let connection : typeof mongoose ;

export const connectToDB = async () => {
    if (!connection){
        try{
            connection = await mongoose.connect(serverConfig.DB_URL);
            connection.connection.on('connected', () => {
                console.log("Connected to database");
            });
            connection.connection.on('disconnected', () => {
                logger.info("Disconnected from database");
            });
            process.on('SIGINT', async () => {
                await mongoose.connection.close();
                process.exit(0);
            })
        }catch{
            mongoose.connection.on('error', (error) => {
                console.log("Error connecting to database", error);
            });
        }
    }
    return connection
}