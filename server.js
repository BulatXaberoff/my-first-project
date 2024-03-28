
http = require('http');
fs = require('fs');

const server = http.createServer((req, res) => {
	fs.readFile('tasks.json', 'utf8', (err, data) => {
			if (err) {
					res.writeHead(500, {'Content-Type': 'text/plain'});
					res.end("Error reading file.");
					return;
			}
			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(data);
	});
});


express = require('express');
const {TaskModel} =require('./taskModel.js');

const { validateTaskData } = require('./middleware/validateTaskData.js');
mongoose= require('mongoose');
require('dotenv').config()
cors=require('cors');

const app = express();
app.use(cors(), express.json());

mongoose.Promise = global.Promise;
const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(mongoUrl)

const PORT = process.env.PORT || 3000;

app.get('/tasks', async(req, res) => {
	try{
			const tasks = await TaskModel.find();
			res.json(tasks);
	} catch(err){
			res.status(500).send(err.message)
			console.log(err.message)
	}
});


app.post('/tasks', validateTaskData, async (req, res) => {
	try{
			
			const newTask = new TaskModel(req.body);
			console.log(req.body)
			const savedTask = newTask.save();
			res.status(201).json(savedTask);
	} catch (err) {
			res.status(400).send(err.message);
			console.log(err.message)
	}
});

app.delete('/tasks', async (req, res) => {
	const taskId = req.params.taskId;
	
    try {
        await TaskModel.findByIdAndDelete(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).send(err.message);
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});