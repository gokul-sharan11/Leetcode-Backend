import mongoose, {Document} from "mongoose";

export interface TestCase {
    input : string;
    output : string;
}

export interface Problem extends Document {
    title : string,
    description : string,
    difficulty : "Easy" | "Medium" | "Hard",
    createdAt : Date,
    updatedAt : Date,
    editorial ?: string,
    testCases : TestCase[]
}

const testCaseSchema = new mongoose.Schema<TestCase>(
    {
        input : {
            type : String,
            required : [true, "Input is required"],
            trim : true,
        },
        output : {
            type : String,
            required : [true, "Input is required"],
            trim : true,
        },
    },
    {
        _id : false // if you don't want default _id to be created
    }
)

const problemSchema = new mongoose.Schema<Problem>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            maxLength: [100, "Title must be less than 100 characters"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim : true,
        },
        difficulty: {
            type: String,
            enum: {
                values : ["Easy", "Medium", "Hard"],
                message : "Invalid difficulty level"
            },
            default : "Easy",
            required: [true, "Difficulty is required"],
        },
        editorial: {
            type: String,
            default: null,
        },
        testCases: [testCaseSchema]
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
        toJSON : {
            transform : (_, record) => {
                delete (record as any).__v;
                record.id = record._id;
                delete record._id;
                return record;
            }
        }
    }
);

export const Problem = mongoose.model<Problem>("Problem", problemSchema);

