import { Request, Response } from "express"
import { ProblemRepository } from "../repository/problem.repository";
import { ProblemService } from "../services/problems.service";

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);

export const ProblemController = {

    async createProblem(req: Request, res: Response): Promise<void> {
        const problem = await problemService.createProblem(req.body);
        res.status(201).json({
            message : "Problem created successfully",
            data : problem,
            success : true
        })
    },

    
    async getProblemById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const problem = await problemService.getProblemById(id);
        if (!problem) {
            res.status(404).json({
                message : "Problem not found",
                success : false
            })
        }
        res.status(200).json({
            message : "Problem retrieved successfully",
            data : problem,
            success : true
        })
    },

    async getAllProblems(req: Request, res: Response): Promise<void> {
        const problems = await problemService.getAllProblems();
        res.status(200).json({
            message : "Problems retrieved successfully",
            data : problems,
            success : true
        })
    },

    async updateProblem(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedProblem = await problemService.updateProblem(id, req.body);
        if (!updatedProblem) {
            res.status(404).json({
                message : "Problem not found",
                success : false
            })
        }
        res.status(200).json({
            message : "Problem updated successfully",
            data : updatedProblem,
            success : true
        })
    },

    async deleteProblem(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const deleted = await problemService.deleteProblem(id);
        if (!deleted) {
            res.status(404).json({
                message : "Problem not found",
                success : false
            })
        }
        res.status(200).json({
            message : "Problem deleted successfully",
            success : true
        })
    },

    async findByDifficulty(req: Request, res: Response): Promise<void> {
        const { difficulty } = req.params;
        const problems = await problemService.findByDifficulty(difficulty as "Easy" | "Medium" | "Hard");
        res.status(200).json({
            message : "Problems retrieved successfully",
            data : problems,
            success : true
        })
    },

    async searchProblems(req: Request, res: Response): Promise<void> {
        const { query } = req.params;
        const problems = await problemService.searchProblems(query);
        res.status(200).json({
            message : "Problems retrieved successfully",
            data : problems,
            success : true
        })
    }
}