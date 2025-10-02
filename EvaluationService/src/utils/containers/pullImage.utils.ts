import Docker from "dockerode"
import logger from "../../config/logger.config";
import { CPP_IMAGE, PYTHON_IMAGE } from "../constants";

export async function pullImageUtility (image : string){
    const docker = new Docker();
    return new Promise ((res,rej) => {
        docker.pull(image, (err : Error, stream : NodeJS.ReadableStream) => {
            if (err){
                rej(err)
                return
            };

            docker.modem.followProgress(
                stream,
                function onFinished(finalErr, output) {
                    if (finalErr) return finalErr;
                    res(output)
                },
                function onProgress(event) {
                    console.log(event.status)
                }
            )
        })
    })
}

export async function pullAllImages(){
    const images = [PYTHON_IMAGE, CPP_IMAGE];

    const promises = images.map(image => pullImageUtility(image));

    try{
        await Promise.all(promises);
        logger.info("All images pulled");
    }catch(error){
        logger.error("Failed to pull all images");
    }
}