import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

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

async function addTask(rl) {
  let id_ = 0;
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    if (i in tasks) continue;
    id_ = i;
    break;
  }
  const description_ = await rl.question("Task Description : ");
  let opt;
  let status_;
  do {
    opt = await rl.question(`
        Select the status
        1.todo
        2.in-progress
        3.done
      `);
  } while (isNaN(opt) || opt < 1 || opt > 3);
  if (opt == 1) status_ = "Todo";
  else if (opt == 2) status_ = "In-Progress";
  else status_ = "Done";
  const createdAt_ = new Date().toLocaleString();
  const updatedAt_ = createdAt_.toString();
  const task = {
    id: id_,
    description: description_,
    status: status_,
    createdAt: createdAt_,
    updatedAt: updatedAt_,
  };
  tasks[id_] = task;
  console.log(task);
}

async function updateTask(rl) {
  let taskId;
  do {
    taskId = rl.question(`Enter a valid task id: `);
  } while (isNaN(taskId) || !(taskId in tasks));

  const task = tasks[taskId];
}
function deleteTask(rl) {}

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

    console.clear();
    if (opt === 1) {
      await addTask(rl);
      let tem = await rl.question("Press Enter...");
    } else if (opt === 2) {
      await updateTask(rl);
      let tem = await rl.question("Press Enter...");
    } else if (opt === 3) {
      await deleteTask(rl);
      let tem = await rl.question("Press Enter...");
    } else {
      running = false;
    }
    console.clear();
    console.log("        The operation is finished...");
    console.log("\n\n");
  }
  console.clear();
  console.log("All the logs are stored in log files in local machine");
  rl.close();
}

main();
