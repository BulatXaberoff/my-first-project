const { TaskModel } = require('./taskModel.js');

fs =require('fs');
Task =require('./task.js');

module.exports = class TaskManager {
    constructor() {
        this.tasks = [];
    }

    loadTasks(filepath) {
			fs.readFile('tasks.json','utf8',(err,data) =>{
				if(err){
					console.error("Error reading file:", err);
					return;
				}
				const tasksData = JSON.parse(data);
				this.tasks = tasksData.map(task => {
					const newTask = new TaskModel(task);
					newTask.save();
					return newTask;
				});
			});
        //try {
        //    const data = fs.readFileSync(filepath, 'utf8');
        //    const tasksData = JSON.parse(data);
        //    this.tasks = tasksData.map(task => new Task(task.id, task.description, task.status));
        //} catch (err) {
        //    console.error('Ошибка чтения файла:', err);
        //}
    }

    saveTasks(filepath) {
        try {
            const tasksData = JSON.stringify(this.tasks, null, 2);
            fs.writeFileSync(filepath, tasksData);
            console.log('Сохранение прошло успешно.');
        } catch (err) {
            console.error('Ошибка сохранения:', err);
        }
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks('tasks.json');
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks('tasks.json');
    }

    printTasks() {
        this.tasks.forEach(task => console.log(task.toString()));
    }
}