import { ISubmission } from "../models/submission.model";
import { submissionQueue } from "../queues/submission.repository";
import logger from "../config/logger.config";

export async function addSubmissionJob (data : ISubmission){
    try{
        const db = await submissionQueue.add("evaluate-submission", data);
        logger.info(`Submission added to queue with id ${db.id}`);
    }catch(err){
        logger.error(`Error adding submission to queue: ${err.message}`);
        return null;
    }
}