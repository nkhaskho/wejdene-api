const express = require('express')

const db = require('./config/db')

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.get('/api/test', (req, res) => {
    res.json({status: 'active'})
})

app.get('/api/users', db.getUsers)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})