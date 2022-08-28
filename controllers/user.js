const { pool } = require('../config/db')

const getUsers = async (req, res) => {
    let query = 'SELECT * FROM users'
    await pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows)}
    })
}

const getUserById = async (req, res) => {
    const id = req.params.id
    if (id == null) {
        res.status(404).json({error: "param id required"})
    }
    let query = `SELECT * FROM users WHERE id=${id};`
    await pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows)}
    })
}

const addUser = async (req, res) => {
    const { name } = req.body
    let query = `INSERT INTO users(name) values(${name});`
    await pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows)}
    })
}

module.exports = {
    getUsers, getUserById, addUser
}