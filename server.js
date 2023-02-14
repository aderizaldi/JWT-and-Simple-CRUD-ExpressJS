const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

//middleware
app.use(express.json()) //app/json parse
app.use(express.urlencoded({ extended: true })) //urlencoded parse
app.use(cors()) //cors

// routes
const routes = require('./app/routes')
app.use('/', routes)

// connect to db
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_CONNECTION)
let db = mongoose.connection

// const session = db.startSession();
// session.startTransaction();

db.on('error', console.error.bind(console, 'Database can\'t connect!\n'))
db.once('open', () => {
    console.log('Database is connected!\n')
})


// listen server
app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
})