import { PYTHON_IMAGE } from '../constants';
import { createDockerContainer } from './createContainer.utils';

export async function runPythonCode (code : string){
    const runCommand = `echo '${code}' > code.py && python3 code.py`;

    const container = await createDockerContainer({
        imageName : PYTHON_IMAGE,
        cmdExecutable : ['/bin/bash', '-c', runCommand],
        memoryLimit : 1024*1024*1024, // 1GB
    });

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

}