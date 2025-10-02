const bashCommand = ['/bin/bash', '-c']

export const commands = {
    python : function (code : string, input : string){
        const runCommand = `echo '${code}' > code.py && echo '${input}' > input.txt && python3 code.py < input.txt`;
        return [...bashCommand, runCommand];
    },
    cpp : function (code : string, input : string){
        const runCommand = `mkdir app && cd app && echo '${code}' > code.cpp && echo '${input}' > input.cpp && g++ code.cpp -o run && ./run < input.txt` // run the executable binary and then we run that 
        return [...bashCommand, runCommand];
    }
}