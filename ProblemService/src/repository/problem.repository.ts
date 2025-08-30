import { Problem } from "../models/problem.model";

export interface IProblemRepository{
    createProblem(problem : Partial<Problem>) : Promise<Problem>; // Partial means only few properties are needed, even if few are there go and create the object in db 
    getProblemById(id : string) : Promise<Problem | null>;
    getAllProblems() : Promise<Problem[]>;
    updateProblem(id : string, updateData : Partial<Problem>) : Promise<Problem | null>;
    deleteProblem(id : string) : Promise<boolean>;
    findByDifficulty (difficulty : "Easy" | "Medium" | "Hard") : Promise<Problem[]>;
    searchProblems(query : string): Promise<Problem[]>;
}

export class ProblemRepository implements IProblemRepository {
    async createProblem(problem : Partial<Problem>) : Promise<Problem> {
        const newProblem = new Problem(problem)
        return await newProblem.save();
    }

    async getProblemById(id : string) : Promise<Problem | null> {
        return await Problem.findById(id);
    }

    async getAllProblems() : Promise<Problem[]> {
        const problems = await Problem.find().sort({createdAt : -1})
        return problems;
    }

    async updateProblem(id : string, updateData : Partial<Problem>) : Promise<Problem | null> {
        return await Problem.findByIdAndUpdate(id, updateData, { new : true });
        // new : true means it will updated the document or else it will return the document before updating 
    }

    async deleteProblem(id : string) : Promise<boolean> {
        const result = await Problem.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async findByDifficulty (difficulty : "Easy" | "Medium" | "Hard") : Promise<Problem[]> {
        return await Problem.find({ difficulty }).exec();
    }

    async searchProblems(query : string): Promise<Problem[]> {
        const regex = new RegExp(query, "i"); // "i" flag makes the search case-insensitive
        return await Problem.find({ title: regex });
    }
}