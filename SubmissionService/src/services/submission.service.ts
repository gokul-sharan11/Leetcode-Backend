import { ISubmission } from "../models/submission.model";
import { ISubmissionRepository } from "../repository/submission.repository";
import { NotFoundError } from "../utils/errors/app.error";
import { getProblemId } from "../apis/problem.api";
import { addSubmissionJob } from "../producers/submission.prodcuer";

export interface ISubmissionService {
    createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission>;
    findById(submissionId: string): Promise<ISubmission | null>;
    findByProblemId(problemId: string): Promise<ISubmission[]>;
    deleteById(submissionId: string): Promise<boolean>;
    updateStatus(submissionId: string, status: ISubmission['status']): Promise<ISubmission | null>;
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
        const problem = await getProblemId(problemId);
        if(!problem){
            throw new NotFoundError(`Problem with id ${problemId} not found`);
        }
        const submission = await this.submissionRepository.createSubmission(submissionData);
        const jobId = await addSubmissionJob({
            submissionId: submissionData.id,
            problem,
            code: submissionData.code,
            language: submissionData.language
        })
        return submission;
        
    }

    async findById(submissionId: string): Promise<ISubmission | null> {
        const submission = await this.submissionRepository.findById(submissionId);
        if(!submission){
            throw new NotFoundError(`Submission with id ${submissionId} not found`);
        }
        return submission;
    }
success
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

    async updateStatus(submissionId: string, status: ISubmission['status']): Promise<ISubmission | null> {
        const submission = await this.submissionRepository.updateStatus(submissionId, status);
        if(!submission){
            throw new NotFoundError(`Submission with id ${submissionId} not found`);
        }
        return submission;
    }
}
