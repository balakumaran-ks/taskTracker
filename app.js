import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

tasks = [];

function addTask() {}
function updateTask() {}
function deleteTask() {}

// loop function for user interaction
async function main() {
  const rl = readline.createInterface({ input, output });
  let running = true;

  while (running) {
    const command = rl.question("Enter a command > ");
  }
  console.clear();
  console.log("All the logs are stored in log files in local machine");
  rl.close();
}

main();
