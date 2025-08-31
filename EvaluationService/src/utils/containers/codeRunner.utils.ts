import logger from '../../config/logger.config';
import { commands } from './commands.utils';
import { createDockerContainer } from './createContainer.utils';

export interface codeRunOptions {
    code : string,
    language : "python" | "cpp",
    timeout : number,
    imageName : string
}

export async function runCode (options : codeRunOptions){

    const {code, language, timeout, imageName} = options;

    const container = await createDockerContainer({
        imageName : imageName,
        cmdExecutable : commands[language](code),
        memoryLimit : 1024*1024*1024, 
    });

    const timeLimitExceededTimeOut = setTimeout(() => {
        console.log("Time limit exceeded");
        container?.kill();
    }, timeout);

    console.log("Container created successfully", container?.id);

    await container?.start();

    // Waiting till the container finishes the processing 
    const status = await container?.wait();

    console.log("Container finished with status code", status);

    const logs = await container?.logs({
        stdout : true,
        stderr : true
    })

    console.log("Container logs", logs?.toString());

    await container?.remove();

    clearTimeout(timeLimitExceededTimeOut)

    if(status.StatusCode == 0){
        logger.info("Container exited successfully");
    }else{
        logger.info("Container exited with error")
    }

}