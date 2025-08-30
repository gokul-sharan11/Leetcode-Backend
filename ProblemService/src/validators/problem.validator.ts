import {z} from "zod";

export const createProblemSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Easy'),
    editorial : z.string().optional(),
    testCases: z.array(z.object({
        input: z.string().min(1),
        output: z.string().min(1)
    })).min(1)
})

export const updateProblemSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().min(1).optional(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Easy').optional(),
    editorial : z.string().optional(),
    testCases: z.array(z.object({
        input: z.string().min(1),
        output: z.string().min(1)
    })).min(1).optional()
})

export const findByDifficultySchema = z.object({
    difficulty: z.enum(['Easy', 'Medium', 'Hard'])
})

export type CreateProblemDto = z.infer<typeof createProblemSchema>
export type UpdateProblemDTO = z.infer<typeof updateProblemSchema>

