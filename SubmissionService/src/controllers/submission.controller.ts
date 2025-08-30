import { Request, Response } from "express";
import { SubmissionRepository } from "../repository/submission.repository";
import { SubmissionService } from "../services/submission.service";

const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(submissionRepository);

export const SubmissionController = {
    async createSubmission (req : Request, res : Response) {

        const submission = await submissionService.createSubmission(req.body);
        res.status(201).json({
            message : "Problem created successfully",
            data : submission,
            success : true
        })
    },
    
    async findSubmissionById (req : Request, res : Response){
        const {id} = req.params
        const submission = await submissionService.findById(id);
        if (!submission) {
            res.status(404).json({
                message : "Problem not found",
                success : false
            })
        }
        res.status(200).json({
            message : "Submission found successfully",
            data : submission,
            success : true
        })
    },
    
    async findSubmissionByProblemId (req : Request, res : Response){
        const {id} = req.params
        const submission = await submissionService.findByProblemId(id);
        if (!submission) {
            res.status(404).json({
                message : "Problem not found",
                success : false
            })
        }
        res.status(200).json({
            message : "Submission found successfully",
            data : submission,
            success : true
        })
    },

    async deleteSubmissionById (req : Request, res : Response){
        const booleanFlag = await submissionService.deleteById(req.params.id);
        if (!booleanFlag) {
            res.status(404).json({
                message : "Problem not found",
                success : false
            })
        }
        res.status(201).json({
            message : "Submission found successfully",
            data : booleanFlag,
            success : true
        })
    },

    
    async updateSubmissionById (req : Request, res : Response){
        const {id} = req.params;
        const submission = await submissionService.updateStatus(id, req.body.status);
        if(!submission){
            res.status(404).json({
                message : "Problem not found",
                success : false
            })
        }
        res.status(201).json({
            message : "Submission found successfully",
            data : submission,
            success : true
        })
    }
}