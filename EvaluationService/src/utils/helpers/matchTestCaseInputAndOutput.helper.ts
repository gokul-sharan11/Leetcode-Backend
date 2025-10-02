import { EvaluationResult, testCase } from "../../interfaces/evaluation.interfaces";

export function matchTestCaseWithResults(testCase : testCase[], results: EvaluationResult[]) {
    let output : Record<string, string> = {};
    if(results.length !== testCase.length) return;

    testCase.forEach((testCase, index) => {
        let retval = "";
        if(results[index].status === "time_limit_exceeded") retval = "TLE";
        else if(results[index].status === "failed") retval = "WA";
        else {
            if (results[index].output == testCase.output) retval = "AC"; 
            else retval = "WA";
        }
        output[index] = retval
    })
    return output;
}
