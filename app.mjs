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

    tasks -> object of objects
    {
        id : task object
    }
*/

function viewAllTasks() {
  Object.values(tasks).forEach((task) => {
    console.log(task);
    console.log("\n");
  });
}

async function addTask(rl) {
  let id_ = 0;
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    if (i in tasks) continue;
    id_ = i;
    break;
  }
  const description_ = await rl.question("Task Description : ");
  let option;
  let status_;
  do {
    option = await rl.question(`
        Select the status
        1.todo
        2.in-progress
        3.done
      `);
  } while (isNaN(option) || option < 1 || option > 3);
  if (option == 1) status_ = "Todo";
  else if (option == 2) status_ = "In-Progress";
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
    taskId = await rl.question(`Enter a valid task id: `);
  } while (isNaN(taskId) || !(taskId in tasks));

  const task = tasks[taskId];
  console.log(task);
}
async function deleteTask(rl) {
  let taskId;
  do {
    taskId = await rl.question(`Enter a valid task id for deletion : `);
  } while (isNaN(taskId) || !(taskId in tasks));
  delete tasks[taskId];
}

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

    let option = Number(command);
    if (isNaN(option) || option > 4 || option < 1) {
      console.log(`Please enter a valid optionion`);
      continue;
    }

    console.clear();
    if (option === 1) {
      await addTask(rl);
      await rl.question("Press Enter..."); // buffer
    } else if (option === 2) {
      await updateTask(rl);
      await rl.question("Press Enter...");
    } else if (option === 3) {
      await deleteTask(rl);
      await rl.question("Press Enter...");
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
