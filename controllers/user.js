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
    if (id == null) { res.status(404).json({error: "param id required"}) }
    let query = `SELECT * FROM users WHERE id=${id};`
    await pool.query(query, (error, results) => {
      if (error) { res.status(400).json({error: error}) }
      else { res.status(200).json(results.rows)}
    })
}

const addUser = (req, res) => {
  const { username, email, password, role } = req.body
  const query = 'INSERT INTO users(username,email,password,role) values($1,$2,$3,$4)'
  pool.query(query, [username, email, password, role], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows)
  })
}

const deleteUser = (req, res) => {
  const query = `DELETE FROM users WHERE id=${req.params.id}`
  pool.query(query, (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows)
  })
}

module.exports = {
    getUsers, getUserById, addUser, deleteUser
}