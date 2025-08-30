import { SubmissionLanguage } from "../models/submission.model";
import { IProblemDetails } from "./problems.dto";

export interface ISubmission {
    submissionId : string;
    problems : IProblemDetails;
    code : string;
    language : SubmissionLanguage;
}