import Docker from "dockerode";
import logger from "../../config/logger.config";

export interface CreateContainerOptions {
    imageName : string;
    cmdExecutable : string [];
    memoryLimit : number;
}

export async function createDockerContainer (options : CreateContainerOptions){
    try {
        const docker = new Docker();

        const container = await docker.createContainer({
            Image : options.imageName,
            Cmd : options.cmdExecutable,
            AttachStdin : true,
            AttachStdout : true,
            AttachStderr : true,
            Tty : false,
            OpenStdin : true, //keep the input stream open even if no input is provided
            HostConfig  : {
                Memory : options.memoryLimit,
                PidsLimit : 100, // to limit the number of processes swapned - fork bomb
                CpuQuota : 50000,
                CpuPeriod : 10000,
                SecurityOpt : ['no-new-privileges'], // to prevent privilege escalation
                NetworkMode : 'none' // to prevent network access 
            }
        })

        logger.info(`Container created with id ${container.id}`)

        return container;
    }catch(error){
        logger.error(`Error creating container: ${error}`);
        throw error;
    }
}