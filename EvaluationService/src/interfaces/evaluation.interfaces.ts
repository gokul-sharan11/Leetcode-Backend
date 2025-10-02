export interface testCase {
    _id : string;
    input : string;
    output : string
}

export interface Problem {
    id : string,
    title : string,
    description : string,
    difficulty : "Easy" | "Medium" | "Hard",
    createdAt : Date,
    updatedAt : Date,
    editorial ?: string,
    testCases : testCase[]
}


export interface Evaluation {
    submissionId : string,
    code : string,
    language : "python" | "cpp",
    problem : Problem
}

export interface EvaluationResult {
    status : string,
    output : string  | undefined
}