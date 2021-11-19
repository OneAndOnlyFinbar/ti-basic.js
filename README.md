# TI-Basic Node.js Compiler
Author: finbar<br>
Docs: ti-basic-compiler.finbar.xyz

This module can write TI-Basic code from Node.js. Note: This does not directly translate javascript to ti-basic, it only writes code from written functions.

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