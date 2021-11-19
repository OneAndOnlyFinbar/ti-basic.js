const fs = require('fs');
class Program{
    constructor(path){
        if(!path) throw new TypeError('No path provided.');
        this.path = path;
        this.code = [];
        this.variables = [];
    }
    async print(text){
        if(!text) return;
        let code;
        if(this.variables?.includes(text))
            code = `Disp ${text}`;
        else
            code = `Disp "${text}"`;
        this.code.push(`${code ?? ''}`);
    }
    async storeResponse(variableName){
        if(!variableName) return;
        const code = `Input ${variableName}`;
        this.code.push(`${code ?? ''}`);
        this.variables.push(variableName);
        return variableName;
    }
    async pause(){
        const code = 'Pause ';
        this.code.push(`${code ?? ''}`);
    }
    async compile() {
        if (!this?.code || !this?.path) return;
        let code = this.code.join(`\n`);
        await fs.writeFile(this.path, code, async function (err) {
            if (err) throw new TypeError(err?.toString());
        })
    }
}

exports.Program = Program;