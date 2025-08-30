import { Worker } from "bullmq";
import { SUBMISSION_QUEUE } from "../utils/constants";
import logger from "../config/logger.config";
import { createNewRedisConnection } from "../config/redis.config";

async function setUpEvaluationWorker(){
    const worker = new Worker(SUBMISSION_QUEUE, async (job) => {1
        logger.info(`Processing job ${job.id}`)
    },
    {
        connection: createNewRedisConnection()
    });

    worker.on("completed", (job) => {
        logger.info(`Job ${job.id} completed`)
    });

    worker.on("error", (error) => {
        logger.error(`Error processing job ${error}}`)
    })

    worker.on("failed", (job, error) => {
        logger.error(`Job ${job?.id} failed`, error)
    })

    
}

export async function startWorkers(){
    setUpEvaluationWorker()
}