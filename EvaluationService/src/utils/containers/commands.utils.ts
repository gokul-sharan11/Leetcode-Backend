const bashCommand = ['/bin/bash', '-c']

export const commands = {
    python : function (code : string){
        const runCommand = `echo '${code}' > code.py && python3 code.py`;
        return [...bashCommand, runCommand];
    },
    cpp : function (code : string){
        const runCommand = `mkdir app && cd app && echo '${code}' > code.cpp && g++ code.cpp -o run && ./run` // run the executable binary and then we run that 
        return [...bashCommand, runCommand];
    }
}