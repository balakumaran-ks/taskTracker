import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { run } from "node:test";

const tasks = {}; //stores the task objects as key-val pairs

/*
    task -> object
    {
        id : unique
        description : str NOT NULL
        status : todo / in-progress / done
        createdAt : timestamp of creation
        updatedAt : timestamp of last update
    }
*/

function addTask() {}
function updateTask() {}
function deleteTask() {}

// loop function for user interaction
async function main() {
  const rl = readline.createInterface({ input, output });
  let running = true;

  while (running) {
    const command = await rl.question(`
        1. New task
        2. Update task
        3. Delete task
        4. Exit

        `);

    let opt = Number(command);
    if (isNaN(opt) || opt > 4 || opt < 1) {
      console.log(`Please enter a valid option`);
      continue;
    }

    if (opt === 1) {
      addTask();
    } else if (opt === 2) {
      updateTask();
    } else if (opt === 3) {
      deleteTask();
    } else {
      running = false;
    }
    console.log("The operation is finished...");

    // Pause execution for 3000 milliseconds (3 seconds)
    await delay(3000); //? await setTimeout(3000) === can also use

    console.clear();
  }
  console.clear();
  console.log("All the logs are stored in log files in local machine");
  rl.close();
}

main();
