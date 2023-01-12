require('dotenv').config()
const express = require('express')
const app = express()
let cors = require('cors')
const path = require('path')
// middleware
const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const connectDB = require('./config/dbConn')
const UserRouter = require('./api/User')

// INIT
app.use(cors())
// bodyParser
const bodyParser = require('express').json;
app.use(bodyParser())
// app.use(express.static(path.join(__dirname, '/public')))
// app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.send("Hello There")
})

// Users route
app.use('/user', UserRouter)


// connect to database
connectDB();

const db = mongoose.connection
db.on('error', (error) => { console.error(error) })
db.once('open', () => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 3000, () => console.log(`Server Started on Port ${process.env.PORT || 3000}`));
})

// app.listen(3000, () => console.log('Server Started on Port 3000'));
