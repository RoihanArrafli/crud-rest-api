require('dotenv').config();

const mongoString = process.env.DATABASE_URL
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser") 
const app = express();

const routes = require('./routes/routes.js');

//middleware
app.use(express.json())
app.use(bodyParser.json())
app.use('/api', routes)



mongoose.connect("mongodb+srv://alignleft:A12345678@cluster0.pbgwvjz.mongodb.net/test");
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(3000, () => {
    console.log("server run on port: 3000");
})