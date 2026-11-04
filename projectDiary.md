###### Wed Nov 4 21:15:49 IST 2026

Started working on the project.

## Getting cli input

#### 1. Single or Sequential Inputs (async/await)  


This approach uses the standard built-in readline/promises library. It reads linearly without creating messy, nested callback trees.

```
javascript
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function run() {
  const rl = readline.createInterface({ input, output });

  const name = await rl.question('Enter your name: ');
  const age = await rl.question('Enter your age: ');

  console.log(`Hello ${name}, you are ${age} years old.`);

  rl.close(); // Crucial to prevent the CLI app from hanging
}

run();
```

(Note: Save this file with a .mjs extension, like index.mjs, so Node.js allows the import syntax naturally without a package.json).

#### 2. The Continuous Loop (Native Menu System)  


If you want to keep prompting the user until they type a specific exit command, you can use a native while loop wrapped inside the async function.

```
javascript
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function startApp() {
const rl = readline.createInterface({ input, output });
let running = true;

console.log('--- NATIVE CLI APP ---');
console.log('Type "exit" to quit.\n');

while (running) {
const command = await rl.question('Enter a command > ');

    if (command.trim().toLowerCase() === 'exit') {
      console.log('Goodbye!');
      running = false;
    } else {
      console.log(`Executing task: "${command}"... Done.\n`);
    }

}

rl.close();
}

startApp();
```

#### 3. Alternative: Reading Arguments Directly (process.argv)

If you don't want to prompt the user during runtime, but instead want to capture options they typed right when booting the script (e.g., node script.mjs John 25), you don't even need readline. You can use the built-in global process.argv array.

```
javascript
// Run this with: node script.mjs John 25

// process.argv[0] is the Node path
// process.argv[1] is the script file path
// process.argv[2] and onwards are your custom inputs

const name = process.argv[2] || 'Guest';
const age = process.argv[3] || 'Unknown';

console.log(`Arguments received -> Name: ${name}, Age: ${age}`);
```
