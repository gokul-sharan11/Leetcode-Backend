import {z} from "zod"
import { SubmissionLanguage} from "../models/submission.model"

export const createSubmissionSchema = z.object({
    problemId: z.string().min(1, "Problem ID is required"),
    userId : z.string().min(1),
    code: z.string().min(1, "Code is required"),
    language: z.nativeEnum(SubmissionLanguage, {
        errorMap: () => ({ message: "Language must be either 'cpp' or 'python'" })
    })
})

// Schema for updating submission status
export const updateSubmissionStatusSchema = z.object({
    status: z.any(),
    output: z.any()
});