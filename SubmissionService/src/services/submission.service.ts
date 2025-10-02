import { ISubmission } from "../models/submission.model";
import { ISubmissionRepository } from "../repository/submission.repository";
import { NotFoundError } from "../utils/errors/app.error";
import { getProblemId } from "../apis/problem.api";
import { addSubmissionJob } from "../producers/submission.prodcuer";
import logger from "../config/logger.config"
import { BadRequestError } from "../utils/errors/app.error";
import { ISubmissionData } from "../models/submission.model";


export interface ISubmissionService {
    createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission>;
    findById(submissionId: string): Promise<ISubmission | null>;
    findByProblemId(problemId: string): Promise<ISubmission[]>;
    deleteById(submissionId: string): Promise<boolean>;
    updateStatus(submissionId: string, status: ISubmission['status'], output: ISubmissionData
    ): Promise<ISubmission | null>;
}

export class SubmissionService implements ISubmissionService {

    private submissionRepository : ISubmissionRepository;

    constructor (submissionRepository : ISubmissionRepository){
        this.submissionRepository = submissionRepository;
    }

    async createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission> {
        // check if the problem exists 
        const problemId = submissionData.problemId;
        if(!problemId){
            throw new Error("Problem id is required");
        }
        if(!submissionData.code) {
            throw new BadRequestError("Code is required");
        }

        if(!submissionData.language) {
            throw new BadRequestError("Language is required");
        }

        const problem = await getProblemId(problemId);
        if(!problem){
            throw new NotFoundError(`Problem with id ${problemId} not found`);
        }
        
        const submission = await this.submissionRepository.createSubmission(submissionData);
        console.log("Submission created");
        console.log(submission.id);

        const jobId = await addSubmissionJob({
            submissionId: submission.id,
            problem,
            code: submissionData.code,
            language: submissionData.language
        })
        logger.info(`Submission job added: ${jobId}`);
        return submission;
        
    }

    async findById(submissionId: string): Promise<ISubmission | null> {
        const submission = await this.submissionRepository.findById(submissionId);
        if(!submission){
            throw new NotFoundError(`Submission with id ${submissionId} not found`);
        }
        return submission;
    }
    
    async findByProblemId(problemId: string): Promise<ISubmission[]> {
        const submissions = await this.submissionRepository.findByProblemId(problemId);
        return submissions;
    }

    async deleteById(submissionId: string): Promise<boolean> {
        const deleted = await this.submissionRepository.deleteById(submissionId);
        if(!deleted){
            throw new NotFoundError(`Submission with id ${submissionId} not found`);
        }
        return deleted;
    }

    async updateStatus(submissionId: string, status: ISubmission['status'], output: ISubmissionData): Promise<ISubmission | null> {
        const submission = await this.submissionRepository.updateStatus(submissionId, status, output);
        if(!submission){
            throw new NotFoundError(`Submission with id ${submissionId} not found`);
        }
        return submission;
    }
}
