const fs= require("fs");
const filePath= "./task.json";

const command= process.argv[2];
const argument=process.argv[3];

const loadTasks=()=>{
    try {
        const dataBuffer= fs.readFileSync(filePath);
        const dataJSON= dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveTasks=(tasks)=>{
    const dataJSON= JSON.stringify(tasks);
    fs.writeFileSync(filePath,dataJSON);
}

const addTask= (task)=>{
    const tasks= loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task added", task);
}

const listTasks=()=>{
    const tasks= loadTasks();
    tasks.forEach((task,index)=> console.log(`${index+1} - ${task.task}`));
}

const removeTask = (taskIndex) => {
    const tasks = loadTasks();

    if (taskIndex < 0 || taskIndex >= tasks.length) {
        console.log("Invalid task index");
        return;
    }

    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    saveTasks(updatedTasks);

    console.log("Task removed", taskIndex);
}


if(command === "add")
{
    addTask(argument);
}
else if(command=="list")
{
    listTasks();
}
else if(command=="remove")
{
    const argument=process.argv[3];
    removeTask(parseInt(argument));
}
else
{
    console.log("Command not found");
}
