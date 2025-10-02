import { Worker } from "bullmq";
import { SUBMISSION_QUEUE } from "../utils/constants";
import logger from "../config/logger.config";
import { createNewRedisConnection } from "../config/redis.config";
import { Evaluation } from "../interfaces/evaluation.interfaces";
import {runCode} from "../utils/containers/codeRunner.utils";
import { LANGUAGE_CONFIG } from "../config/language.config";
import { matchTestCaseWithResults } from "../utils/helpers/matchTestCaseInputAndOutput.helper";
import { EvaluationResult } from "../interfaces/evaluation.interfaces";
import { updateSubmission } from "../api/submission.api";

/**
 * Sets up a worker to process evaluation jobs
 * The worker will run a docker container with the given code and input
 * The worker will log the job id when processing the job, and log the job id when the job is completed or failed
 * The worker will also log any errors that occur while processing the job
 */
export async function setUpEvaluationWorker(){
    const worker = new Worker(SUBMISSION_QUEUE, async (job) => {1
        logger.info(`Processing job ${job.id}`)
        const data : Evaluation = job.data;

        console.log(data)

        const result = data.problem.testCases.map((testCase) => {
            return runCode({
                code : data.code,
                language : data.language,
                timeout : LANGUAGE_CONFIG[data.language].timeOut,
                imageName : LANGUAGE_CONFIG[data.language].imageName,
                input : testCase.input
            })
        })

        const testCasesResults : EvaluationResult[] = await Promise.all(result);

        const output = matchTestCaseWithResults(data.problem.testCases, testCasesResults);

        await updateSubmission(data.submissionId, "COMPLETED", output || {});

        console.log(output);
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