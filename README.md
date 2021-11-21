# TI-Basic Node.js Compiler
<a href="https://www.npmjs.com/package/ti"><img src="https://img.shields.io/npm/v/ti-basic?style=for-the-badge"></img></a>

Author: finbar <br>
Github: https://github.com/OneAndonlyFinbar/ti-basic.js <br>
NPM: https://www.npmjs.com/package/ti-basic <br>

This module can write TI-Basic code from Node.js. <br>
Note: This does not directly evaluate javascript and convert it to TI-Basic

<hr>

# Quick Start

```
// Creates a program, prints hello world, compiles file into ./program.txt
const { Program } = require('ti-basic.js');
const program = new Program('./program.txt');
program.print('Hello world!');
program.compile();
```

<hr>

# Methods

```
//Create a new program with given file path
new Program('FilePath');

// Print Message to the program
program.print('Message');

// Await a response, and store the value in a variable.
// Returns variable name
program.storeResponse('Variable Name');

// Insert a pause statement to prevent the program from exiting on quit.
program.pause();

//Compiles the program into TI-Basic code.
program.compile();
```

# If/Else Statements
If/else statements can be used to create conditional logic. An example of a program that uses if/else statements is the following:
```
const program = new Program('./program.txt');
program.print('Enter a number: ');
program.storeResponse('A');
await program.createIfElse({
    condition: 'A=1',
    true: async function(program) {
        await program.print('True');
        await program.stop();
        return program;
    },
    false: async function (program){
        await program.print('False');
        await program.stop();
        return program;
    }
});
```
In the program above the program will ask for a number user input. If the number equals 1 it will print `True` to console, otherwise it will print `False` to console.

if/else Statement functions (`true` and `false`) have a `program` variable passed to them. This variable is the program object for that condition. (`true` or `false`)<br>
At the end of the `true`/`false` statements be sure to return the program.<br>
The condition is not a regular javascript comparison, but instead a TI-Basic expression. Examples of TI-Basic expressions are below<br>
```
1=1
A=1
A=B
A=B+C
A=B-C
2>1
```
