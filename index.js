const express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')

const User = require('./controllers/user')
const Category = require('./controllers/category')
const Ticket = require('./controllers/ticket')
const Auth = require('./middlewares/auth')
const Stock = require('./controllers/stock')
const SubCategory = require('./controllers/subcategory')
const { authenticate } = require('./controllers/auth')

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
// app.use(express.json())
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))

app.get('/api/test', (req, res) => {
    res.json({status: 'active'})
})

// users endpoint
app.get('/api/users', User.getUsers)
app.post('/api/users', Auth.isAdmin, User.addUser)
app.get('/api/users/:id', User.getUserById)
app.put('/api/users/:id', User.updateUser)
app.delete('/api/users/:id', Auth.isAdmin, User.deleteUser)

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

// subcategories endpoint
app.get('/api/subcategories', SubCategory.getSubCategories)
app.post('/api/subcategories', SubCategory.addSubCategory)
app.get('/api/subcategories/:id', SubCategory.getSubCategoryById)
app.put('/api/subcategories/:id', SubCategory.updateSubCategory)
app.delete('/api/subcategories/:id', SubCategory.deleteSubCategory)

// stocks endpoint
app.get('/api/stocks', Stock.getStocks)
app.post('/api/stocks', Auth.isAdmin, Stock.addStock)
app.get('/api/stocks/:id', Stock.getStockById)
app.put('/api/stocks/:id', Stock.updateStock)
app.delete('/api/stocks/:id', Stock.deleteStock)

// auth endpoint
app.post('/api/auth', authenticate)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})