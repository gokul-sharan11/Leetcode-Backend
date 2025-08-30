
export interface ITestCase {
    input : string;
    output : string;
}

export interface IProblemDetails {
    id : string;
    title : string;
    description : string;
    difficulty : "Easy" | "Medium" | "Hard";
    createdAt : Date;
    updatedAt : Date;
    editorial ?: string;
    testCases : ITestCase[]
}

export interface IProblemResponse {
    data : IProblemDetails;
    message : string;
    success : boolean;
}