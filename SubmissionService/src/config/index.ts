// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
    DB_URL : string 
    REDIS_HOST : string
    REDIS_PORT : number
    PROBLEM_SERVICE_URL : string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001,
    DB_URL : process.env.DB_URL || "mongodb://localhost:27017/lc_submission_db",
    REDIS_HOST : process.env.REDIS_HOST || "127.0.0.1",
    REDIS_PORT : Number(process.env.REDIS_PORT) || 6379,
    PROBLEM_SERVICE_URL : process.env.PROBLEM_SERVICE_URL || "localhost:3000"
};