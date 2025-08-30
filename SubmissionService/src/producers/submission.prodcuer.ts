import { submissionQueue } from "../queues/submission.queues";
import { ISubmissionJob } from "../dto/submission.dto";
import logger from "../config/logger.config";

export async function addSubmissionJob (data : ISubmissionJob) : Promise<string | null>{
    try{
        const job = await submissionQueue.add("evaluate-submission", data);
        logger.info(`Submission added to queue with id ${job.id}`);
        return job.id || null;
    }catch(error){
        logger.error(`Error adding submission to queue: ${error}`);
        return null;
    }
}