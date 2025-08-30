import { SubmissionLanguage } from "../models/submission.model";
import { IProblemDetails } from "./problems.dto";

export interface ISubmissionJob {
    submissionId : string;
    problem : IProblemDetails;
    code : string;
    language : SubmissionLanguage;
}