mongoose= require('mongoose');
require('dotenv').config()

const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}/?authSource=admin`;
console.log(mongoUrl)

mongoose.connect(mongoUrl)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.error('MongoDB connection error:', err));