mongoose= require('mongoose');
require('dotenv').config()
TaskManager = require( "./task-manager.js")

mongoose.Promise = global.Promise;
const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(mongoUrl)
.then(()=> {console.log("MongoDB connected")
var testManager = new TaskManager();

testManager.loadTasks('tasks.json');
})
.catch(err => console.error('MongoDB connection error:', err));