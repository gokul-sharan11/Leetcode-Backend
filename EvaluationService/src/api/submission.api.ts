import axios from "axios";
import { serverConfig } from "../config";
import { InternalServerError } from "../utils/errors/app.error";
import logger from "../config/logger.config";

export async function updateSubmission (submissionId : string, status : string, output : Record<string, string>) {
    try {
        const url = `${serverConfig.SUBMISSION_SERVICE_URL}/submissions/${submissionId}/status`;
        console.log(url);
        const response = await axios.patch(url, {
            status : status,
            output : output
        });
        if (response.status !== 200) {
            throw new InternalServerError("Failed to update submission");
        }
    }
    catch(error){
        logger.error(`Error fetching problem details: ${error}`);
        console.log(error);
        return null;
    }
}