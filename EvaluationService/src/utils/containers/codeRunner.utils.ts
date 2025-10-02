import logger from '../../config/logger.config';
import { commands } from './commands.utils';
import { createDockerContainer } from './createContainer.utils';

export interface codeRunOptions {
    code : string,
    language : "python" | "cpp",
    timeout : number,
    imageName : string,
    input : string
}

export async function runCode (options : codeRunOptions){

    const {code, language, timeout, imageName, input} = options;

    const container = await createDockerContainer({
        imageName : imageName,
        cmdExecutable : commands[language](code, input),
        memoryLimit : 1024*1024*1024, 
    });

    let isTimeLimtExceeded = false;
    const timeLimitExceededTimeOut = setTimeout(() => {
        console.log("Time limit exceeded");
        isTimeLimtExceeded = true
        container?.kill();
    }, timeout);

    console.log("Container created successfully", container?.id);

    await container?.start();

    // Waiting till the container finishes the processing 
    const status = await container?.wait();

    if(isTimeLimtExceeded){
        await container?.remove();
        return {
            status : "time_limit_exceeded",
            output : "Time limit exceeded"
        }
    }

    console.log("Container finished with status code", status);

    const logs = await container?.logs({
        stdout : true,
        stderr : true
    })

    const containerLogs = processLogs(logs);

    console.log("Container logs", containerLogs);

    await container?.remove();

    clearTimeout(timeLimitExceededTimeOut)

    if(status.StatusCode == 0){
        logger.info("Container exited successfully");
        return {
            status : "success",
            output : containerLogs
        }
    }else{
        logger.info("Container exited with error");
        return {
            status: "failed",
            output: containerLogs
        }
    }

}

function processLogs(logs : Buffer | undefined){
    return logs?.toString('utf-8')
    .replace(/\x00/g, '')
    .replace(/[\x00-\x09-\x1F\x7F-\x9F]/g, '')
    .trim();
}