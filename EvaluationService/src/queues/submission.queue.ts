import { Queue } from "bullmq";
import { createNewRedisConnection } from "../config/redis.config";
import logger from "../config/logger.config";

export const submissionQueue = new Queue("submission", {
    connection : createNewRedisConnection(),
    defaultJobOptions : {
        attempts : 3,
        backoff : {
            type : "exponential",
            delay : 2000
        }
    }
});

submissionQueue.on("error", (error) => {
    logger.info(`Submission to queue failed : ${error}`);
});

submissionQueue.on("waiting", (job) => {
    logger.info("Submission to queue waiting... : ${job.id}");
})