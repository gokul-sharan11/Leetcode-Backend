import axios, { AxiosResponse } from "axios";
import { IProblemDetails } from "../dto/problems.dto";
import { serverConfig } from "../config";
import { InternalServerError } from "../utils/errors/app.error";
import logger from "../config/logger.config";
import { IProblemResponse } from "../dto/problems.dto";

export async function getProblemId (problemId : string) : Promise<IProblemDetails | null>{
    try {
        const response : AxiosResponse<IProblemResponse> = 
            await axios.get(`${serverConfig.PROBLEM_SERVICE_URL}/problems/${problemId}`);

            if (response.data.success){
                return response.data.data;
            }
            throw new InternalServerError("Failed to get problem details");
    }
    catch(error){
        logger.error(`Error fetching problem details: ${error}`)
        return null;
    }

}