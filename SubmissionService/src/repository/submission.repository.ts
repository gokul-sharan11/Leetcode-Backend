import { ISubmission, Submission } from "../models/submission.model";

export interface ISubmissionRepository {
    createSubmission(submissionData : Partial<ISubmission>) : Promise<ISubmission>
    findById(submissionId : string) : Promise<ISubmission | null>
    findByProblemId(problemId : string) : Promise<ISubmission[]>
    deleteById(submissionId : string) : Promise<boolean>
    updateStatus(submissionId : string, status : ISubmission['status']) : Promise<ISubmission | null>
}

export class SubmissionRepository implements ISubmissionRepository {

    async createSubmission(submissionData: Partial<ISubmission>): Promise<ISubmission> {
        const submission = await Submission.create(submissionData);
        return submission;
    }
    
    async findById(submissionId: string): Promise<ISubmission | null> {
        const submission = await Submission.findById(submissionId);
        return submission;
    }
    
    async findByProblemId(problemId: string): Promise<ISubmission[]> {
        const submissions = await Submission.find({ problemId });
        return submissions;
    }
    
    async deleteById(submissionId: string): Promise<boolean> {
        const result = await Submission.findByIdAndDelete(submissionId);
        return result !== null;
    }
    
async updateStatus(submissionId: string, status: ISubmission['status']): Promise<ISubmission | null > {
        const submission = await Submission.findByIdAndUpdate(submissionId, {status}, {new : true});
        return submission;
    }
}
