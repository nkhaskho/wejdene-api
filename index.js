const express = require('express')
var bodyParser = require('body-parser')

const User = require('./controllers/user')
const Category = require('./controllers/category')
const Ticket = require('./controllers/ticket')
const SubCategory = require('./controllers/sub-category')
const Auth = require('./controllers/auth')

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
app.put('/api/users/:id', User.updateUser)
app.delete('/api/users/:id', User.deleteUser)

// tickets endpoint
app.get('/api/tickets', Ticket.getTickets)
app.post('/api/tickets', Ticket.addTicket)
app.get('/api/tickets/:id', Ticket.getTicketById)
app.put('/api/tickets/:id', Ticket.updateTicket)
app.delete('/api/tickets/:id', Ticket.deleteTicket)

// categories endpoint
app.get('/api/categories', Category.getCategories)
app.post('/api/categories', Category.addCategory)
app.get('/api/categories/:id', Category.getCategoryById)
app.put('/api/categories/:id', Category.updateCategory)
app.delete('/api/categories/:id', Category.deleteCategory)

// categories endpoint
app.get('/api/subcategories', SubCategory.getSubCategories)
app.post('/api/subcategories', SubCategory.addSubCategory)
app.get('/api/subcategories/:id', SubCategory.getSubCategoryById)
app.delete('/api/subcategories/:id', SubCategory.deleteSubCategory)

// auth endpoint
app.post('/api/auth', Auth.authenticate)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})