import { CreateProblemDto } from "../validators/problem.validator";
import { Problem } from "../models/problem.model";
import { IProblemRepository } from "../repository/problem.repository";
import { NotFoundError } from "../utils/errors/app.error";
import {sanitizeMarkdown} from "../utils/markdown.sanitizer"

export interface IProblemService {
    createProblem(createProblemDto: CreateProblemDto): Promise<Problem>;
    getProblemById(id: string): Promise<Problem | null>;
    getAllProblems(): Promise<Problem[]>;
    updateProblem(id: string, updateData: Partial<Problem>): Promise<Problem | null>;
    deleteProblem(id: string): Promise<boolean>;
    findByDifficulty(difficulty: "Easy" | "Medium" | "Hard"): Promise<Problem[]>;
    searchProblems(query: string): Promise<Problem[]>;
}

export class ProblemService implements IProblemService {

    private problemRepository: IProblemRepository;

    constructor (problemRepository: IProblemRepository) {
        this.problemRepository = problemRepository;
    }
    
    async createProblem(problem: CreateProblemDto): Promise<Problem> {
        const sanitizedPayload = {
            ...problem,
            description : await sanitizeMarkdown(problem.description),
            editorial : problem.editorial && await sanitizeMarkdown(problem.editorial)
        }
        return await this.problemRepository.createProblem(sanitizedPayload);
    }

    async getProblemById(id: string): Promise<Problem | null> {
        const problem = await this.problemRepository.getProblemById(id);
        if(!problem){
            throw new NotFoundError("Problem Not Found");
        }
        return problem;
    }

    async getAllProblems(): Promise<Problem[]> {
        return await this.problemRepository.getAllProblems();
    }

    async updateProblem(id: string, updateData: Partial<Problem>): Promise<Problem | null> {
        const problem = await this.problemRepository.getProblemById(id);
        if (!problem) {
            throw new NotFoundError("Problem Not Found");
        }
        const sanitizedPayload = {
            ...updateData
        }
        if (updateData.description){
            sanitizedPayload.description = await sanitizeMarkdown(updateData.description);
        }
        if (updateData.editorial){
            sanitizedPayload.editorial = await sanitizeMarkdown(updateData.editorial);
        }
        return await this.problemRepository.updateProblem(id, sanitizedPayload);
    }

    async deleteProblem(id: string): Promise<boolean> {
        const problem = await this.problemRepository.getProblemById(id);
        if (!problem) {
            throw new NotFoundError("Problem Not Found");
        }
        return await this.problemRepository.deleteProblem(id);
    }

    
    async findByDifficulty(difficulty: "Easy" | "Medium" | "Hard"): Promise<Problem[]> {
        return await this.problemRepository.findByDifficulty(difficulty);
    }

    async searchProblems(query: string): Promise<Problem[]> {
        return await this.problemRepository.searchProblems(query);
    }
}