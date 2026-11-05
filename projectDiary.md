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

<br>
learned about git stash command

<br>

# Git Stash Cheat Sheet

## 💾 SAVE CHANGES (Put in the drawer)

- `git stash` - Stash tracked changes (modified files)
- `git stash -u` - Stash tracked AND new untracked files
- `git stash -a` - Stash everything (including ignored files)
- `git stash save "my message"` - Stash changes with a descriptive label

## 🔄 RESTORE CHANGES (Take out of the drawer)

- `git stash pop` - Apply latest stash and DELETE it from history
- `git stash apply` - Apply latest stash but KEEP it in the list
- `git stash apply stash@{2}` - Apply a specific stash from the history list

## 📋 VIEW & CHECK (See what's inside)

- `git stash list` - View all saved stashes with index numbers
- `git stash show` - See summary of changes in the latest stash
- `git stash show -p` - See the full detailed diff of the latest stash

## 🗑️ CLEAN UP (Delete stashes)

- `git stash drop stash@{1}` - Delete one specific stash
- `git stash clear` - Delete ALL stashes permanently

## 🚀 ADVANCED TRICKS

- `git stash branch <name>` - Create a new branch and pop your stash into it

---

## 💡 Quick Scenario Guide

### Scenario 1

"I need to pull the latest main branch code, but my current work isn't ready to commit yet."

```bash
git stash -u
git pull origin main
git stash pop
```

### Scenario 2

"I accidentally started working on the main branch instead of my feature branch!"

```bash
git stash -u
git checkout my-feature-branch
git stash pop
```

<br>
<br>
<br>

Learned how to typecast into numbers

```javascript
Number(str);
parseInt(str);
parseFloat(str);
```

<br>
<br>
<br>
<br>
<br>
<br>

###### Thu Nov 5 11:02:43 IST 2026

filled up the 3 basic methods into templates.

<br>
<br>
Learned about js object iteration

```javascript
const user = { name: "Alex", age: 30, role: "Admin" };

for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

// 1. Iterate over keys only
Object.keys(user).forEach((key) => {
  console.log(key); // Output: 'name', 'age', 'role'
});

// 2. Iterate over values only
Object.values(user).forEach((value) => {
  console.log(value); // Output: 'Alex', 30, 'Admin'
});

// best for working in legacy systems
for (const key in user) {
  if (user.hasOwnProperty(key)) {
    console.log(`${key}: ${user[key]}`);
  }
}
```

<br>
<br>

#### Learned about basic string cleanup in Js

Quick Cheat Sheet

| Cleanup Goal       | Code Snippet                                         |
| ------------------ | ---------------------------------------------------- |
| Remove edge spaces | str.trim()                                           |
| Remove all spaces  | str.replace(/\s/g, '')                               |
| Keep ONLY numbers  | str.replace(/[^0-9]/g, '')                           |
| Keep ONLY alphabet | str.replace(/[^a-zA-Z]/g, '')                        |
| URL-safe Slugs     | str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') |

<br>
<br>

| Category   | Method        | Syntax Example            | Returns | What It Does                                                                 |
| ---------- | ------------- | ------------------------- | ------- | ---------------------------------------------------------------------------- |
| Searching  | includes()    | str.includes('Java')      | Boolean | Checks if a substring exists anywhere inside the string.                     |
|            | startsWith()  | str.startsWith('J')       | Boolean | Checks if the string begins with the specified characters.                   |
|            | endsWith()    | str.endsWith('Script')    | Boolean | Checks if the string ends with the specified characters.                     |
|            | indexOf()     | str.indexOf('a')          | Number  | Returns the index of the first occurrence of a value, or -1.                 |
|            | lastIndexOf() | str.lastIndexOf('a')      | Number  | Returns the index of the last occurrence of a value, or -1.                  |
|            | search()      | str.search(/regex/)       | Number  | Searches via Regular Expression and returns the first match index.           |
| Extracting | slice()       | str.slice(start, end)     | String  | Extracts a section from start up to end (supports negative index).           |
|            | substring()   | str.substring(start, end) | String  | Extracts a section between two indices (negative numbers become 0).          |
|            | charAt()      | str.charAt(0)             | String  | Returns the character at the specified index (same as str[0]).               |
| Formatting | toLowerCase() | str.toLowerCase()         | String  | Converts all characters in the string to lowercase.                          |
|            | toUpperCase() | str.toUpperCase()         | String  | Converts all characters in the string to uppercase.                          |
|            | trim()        | str.trim()                | String  | Strips whitespace, tabs, and newlines from both ends.                        |
|            | padStart()    | str.padStart(5, '0')      | String  | Pads the start of a string with a character until it hits the target length. |
|            | padEnd()      | str.padEnd(5, '!')        | String  | Pads the end of a string with a character until it hits the target length.   |
|            | repeat()      | str.repeat(3)             | String  | Returns a new string with the original text repeated N times.                |
| Transform  | split()       | str.split(', ')           | Array   | Splits a string into an array of substrings based on a separator.            |
|            | replace()     | str.replace('a', 'b')     | String  | Replaces the first instance of a matching string or regular expression.      |
|            | replaceAll()  | str.replaceAll('a', 'b')  | String  | Replaces all instances of a matching string or regular expression.           |
