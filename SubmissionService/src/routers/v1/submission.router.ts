import express from 'express';
import { SubmissionController } from '../../controllers/submission.controller';
import {  validateRequestBody } from '../../validators';
import { createSubmissionSchema, updateSubmissionStatusSchema } from '../../validators/submission.validator';

const submissionRouter = express.Router();

submissionRouter.post('/', validateRequestBody(createSubmissionSchema), SubmissionController.createSubmission)
submissionRouter.get('/:id', SubmissionController.findSubmissionById);
submissionRouter.get('/:id', SubmissionController.findSubmissionByProblemId)
submissionRouter.put('/:id/status', validateRequestBody(updateSubmissionStatusSchema), SubmissionController.updateSubmissionById)
submissionRouter.delete(
    '/:id', 
    SubmissionController.deleteSubmissionById
);

export default submissionRouter;


