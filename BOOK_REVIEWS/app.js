require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const books_routes = require('./routes/book-routes')

const user_routes = require('./routes/user-routes')
const { verifyUser } = require('./middlewares/auth')
const upload = require('./middlewares/upload')

const MONGODB_URL = process.env.NODE_ENV === 'test'
                ? process.env.TEST_DB_URL
                :process.env.DB_URL


mongoose.connect(MONGODB_URL)
// mongoose.connect('mongodb://127.0.0.1:27017/Books-Review')
    .then(() => {
        console.log(`connected to ${MONGODB_URL} database server`)
        // console.log('connected to the mongodb database server')
    })
    .catch((err) => console.log(err))




const app = express()  //initiate  express by giving name app

app.use(express.json())   //request pass through this

app.use(express.static('public'))

//user request
app.get('/', (req, res) => {
    //  console.log(req)
    res.send("Hello world")

})


//main routes for users
app.use('/users', user_routes)
//app.use(verifyUser) //calling middleware
app.use('/books', verifyUser, books_routes)

app.post('/upload', upload.single('photo'), (req, res, next) => {
    res.json(req.file)
})


//error handlind middleware

app.use((err, req, res, next) => {
    console.error(err)
    if (err.name === ' ValidatorError') res.status(400)
    else if (err.name === ' CastError') res.status(400)
    console.log(err.message)
    res.json({ error: err.message })
})


//unknown path 

app.use((req, res) => {
    res.status(404).json({ error: "path not found" })
})

module.exports =  app 