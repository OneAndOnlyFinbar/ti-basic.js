const fs = require('fs');
/**
 * @summary Creates a new program.
 * @description Creates a new program with given file path.
 * @return {Object} Program.
 * @param {string} path - Path for program to be compiled to.
 */
class Program{
    constructor(path){
        if(!path) throw new TypeError('No path provided.');
        this.path = path;
        this.code = [];
        this.variables = [];
    }
    /**
     * @summary Prints text to program.
     * @description Prints text to program.
     * @param {string} text - Text to print.
     */
    async print(text){
        if(!text) return;
        let code;
        if(this.variables?.includes(text))
            code = `Disp ${text}`;
        else
            code = `Disp "${text}"`;
        this.code.push(`${code ?? ''}`);
    }
    /**
     * @summary Store a response.
     * @description Store a response with a given process variable.
     * @return {string} Variable name.
     * @param {string} variableName - Name for the variable to be stored in in the program.
     */
    async storeResponse(variableName){
        if(!variableName) return;
        const code = `Input ${variableName}`;
        this.code.push(`${code ?? ''}`);
        this.variables.push(variableName);
        return variableName;
    }
    /**
     * @summary Pauses program.
     * @description Pauses program.
     */
    async pause(){
        const code = 'Pause ';
        this.code.push(`${code ?? ''}`);
    }
    /**
     * @summary Creates an if/else statement.
     * @description Creates an if/else statement. Both true and false functions pass a program parameter which you should treat as any other regular program.
     * @param {Object} parameters - Parameters for if/else statement.
     * @param {string} parameters.condition - Condition for if/else statement.
     * @param {Function} parameters.true - Function to execute if condition is true.
     * @param {Function} parameters.false - Function to execute if condition is false.
     */
    async createIfElse(parameters){
        const condition = parameters.condition;
        const program1 = new TemporaryProgram();
        const program2 = new TemporaryProgram();

        let trueCode = await parameters.true(program1);
        let falseCode = await parameters?.false(program2);
        trueCode = await trueCode.compile();
        falseCode = await falseCode?.compile();

        if(!trueCode && !falseCode) return;

        this.code.push(`If ${condition}`, 'Then');
        if(trueCode) {
            this.code.push(trueCode);
        }
        if(falseCode) {
            this.code.push(`Else`, falseCode);
        }
        this.code.push('End');
    }
    /**
     * @summary Exits program.
     * @description Exits program.
     */
    async stop(){
        this.code.push('Stop');
    }
    /**
     * @summary Compiles program.
     * @description Compiles program from javascript to TI-Basic.
     */
    async compile() {
        if (!this?.code || !this?.path) return;
        let code = this.code.join(`\n`);
        await fs.writeFile(this.path, code, async function (err) {
            if (err) throw new TypeError(err?.toString());
        })
    }
}

class TemporaryProgram{
    constructor() {
        this.code = [];
        this.variables = [];
    }
    /**
     * @summary Prints text to program.
     * @description Prints text to program.
     * @param {string} text - Text to print.
     */
    async print(text){
        if(!text) return;
        let code;
        if(this.variables?.includes(text))
            code = `Disp ${text}`;
        else
            code = `Disp "${text}"`;
        this.code.push(`${code ?? ''}`);
    }
    /**
     * @summary Store a response.
     * @description Store a response with a given process variable.
     * @return {string} Variable name.
     * @param {string} variableName - Name for the variable to be stored in in the program.
     */
    async storeResponse(variableName){
        if(!variableName) return;
        const code = `Input ${variableName}`;
        this.code.push(`${code ?? ''}`);
        this.variables.push(variableName);
        return variableName;
    }
    /**
     * @summary Pauses program.
     * @description Pauses program.
     */
    async pause(){
        //Dont remove space after "Pause", its required in TI-Basic syntax
        this.code.push('Pause ');
    }
    /**
     * @summary Creates an if/else statement.
     * @description Creates an if/else statement. Both true and false functions pass a program parameter which you should treat as any other regular program.
     * @param {Object} parameters - Parameters for if/else statement.
     * @param {string} parameters.condition - Condition for if/else statement.
     * @param {Function} parameters.true - Function to execute if condition is true.
     * @param {Function} parameters.false - Function to execute if condition is false.
     */
    async createIfElse(parameters){
        const condition = parameters.condition;
        const program1 = new TemporaryProgram();
        const program2 = new TemporaryProgram();

        let trueCode = await parameters.true(program1);
        let falseCode = await parameters?.false(program2);
        trueCode = await trueCode.compile();
        falseCode = await falseCode?.compile();

        if(!trueCode && !falseCode) return;

        this.code.push(`If ${condition}`, 'Then');
        if(trueCode) {
            this.code.push(trueCode);
        }
        if(falseCode) {
            this.code.push(`Else`, falseCode);
        }
        this.code.push('End');
    }
    /**
     * @summary Exits program.
     * @description Exits program.
     */
    async stop(){
        this.code.push('Stop');
    }
    /**
     * @summary Compiles program.
     * @description Compiles program from javascript to TI-Basic.
     */
    async compile() {
        if (!this?.code) return;
        return this.code.join(`\n`);
    }
}

exports.Program = Program;