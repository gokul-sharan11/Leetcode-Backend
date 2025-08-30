import { Document, Schema, model } from "mongoose";

export enum SubmissionStatus {
    PENDING = "pending",
    COMPILING = "compiling",
    RUNNING = "running",
    ACCEPTED = "accepted",
    FAILED = "failed"
}

export enum SubmissionLanguage {
    CPP = "cpp",
    PYTHON = "python"
}
export interface ISubmission extends Document {
    problemId : string;
    code : string;
    userId: string;
    language : SubmissionLanguage;
    status : SubmissionStatus;
    createdAt : Date;
    updatedAt : Date;
}

const submissionSchema = new Schema<ISubmission>({
    problemId : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    language : {
        type : String,
        required : true,
        enum : Object.values(SubmissionLanguage)
    },
    status : {
        type : String,
        required : true,
        enum : Object.values(SubmissionStatus),
        default : SubmissionStatus.PENDING
    }
    },
    {
        timestamps : true,
        toJSON : {
            transform : (_, record) => {
                delete (record as any).__v;
                record.id = record._id;
                delete record._id;
                return record;
            }
        }
    }
)

submissionSchema.index({status : 1, createdAt : -1})
export const Submission = model<ISubmission>("Submission", submissionSchema)
