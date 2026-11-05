import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const tasks = {}; //stores the task objects as key-val pairs
let TASKID = 1; // universal task id for generating sequence

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

// console log all the tasks one by one
async function viewAllTasks() {
  Object.values(tasks).forEach((task) => {
    console.log(task);
    console.log("\n");
  });
}

//adds a task to the list
async function addTask(rl) {
  let id_ = TASKID;
  TASKID += 1;
  let description_ = await rl.question("Task Description : ");
  while (description_.trim() === "") {
    description_ = await rl.question("Please enter a valid Description : ");
  }
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

//update the existing task details
async function updateTask(rl) {
  let taskId;
  do {
    taskId = await rl.question(
      `Enter a valid task id (-1 to return to main menu): `,
    );
    if (taskId == -1) return;
  } while (isNaN(taskId) || !(taskId in tasks));

  const task = tasks[taskId];
  console.log(`Selected task details : `);
  console.log(task);
  console.log("\n");

  //new description
  const newDescription = await rl.question(
    `New Description (Leave empty if same as old) : `,
  );
  if (newDescription.trim() !== "") task.description = newDescription;

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

  task.status = status_;
  task.updatedAt = new Date().toLocaleString();

  console.log(`Task after update:`);
  console.log(task);
}

//delete the specified task from the list
async function deleteTask(rl) {
  let taskId;
  do {
    taskId = await rl.question(
      `Enter a valid task id for deletion (-1 to cancel): `,
    );
    if (taskId == -1) return;
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
        4. Show all tasks 
        5. Exit

        `);

    let option = Number(command);
    if (isNaN(option) || option > 5 || option < 1) {
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
    } else if (option == 4) {
      await viewAllTasks();
      await rl.question(`Press Enter...`);
    } else {
      running = false;
    }
    console.clear();
    console.log("The operation is finished...");
  }
  console.clear();
  console.log("All the logs are stored in log files in local machine");
  rl.close();
}

main();
