const express = require('express')
var bodyParser = require('body-parser')

const User = require('./controllers/user')
const Category = require('./controllers/category')

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

app.get('/api/test', (req, res) => {
    res.json({status: 'active'})
})

// users endpoint
app.get('/api/users', User.getUsers)
app.post('/api/users', User.addUser)
app.get('/api/users/:id', User.getUserById)

// categories endpoint
app.get('/api/categories', Category.getCategories)
app.post('/api/categories', Category.addCategory)
app.get('/api/categories/:id', Category.getCategoryById)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})