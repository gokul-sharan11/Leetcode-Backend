import Redis from "ioredis";
import { serverConfig } from ".";
import logger from "./logger.config"

let redisClient;
export const connectToRedis = (): Redis => {
    const redisConfig = {
        host : serverConfig.REDIS_HOST,
        port : serverConfig.REDIS_PORT
    };

    if (!redisClient) {
        redisClient = new Redis(redisConfig);

        redisClient.on('connect', () => {
            console.log('Connected to Redis!');
        });

        redisClient.on('error', (err) => {
            logger.error("Redis connection error:", err);
        });

        process.on("SIGINT", async () => {
            try {
                console.log("Closing Redis connection due to SIGINT...");
                await redisClient?.quit();
                console.log("Redis connection closed.");
                process.exit(0);
            } catch (err) {
                console.error("Error closing Redis:", err);
                process.exit(1);
            }
        });
    }

    return redisClient;
}
