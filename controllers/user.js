const { pool } = require('../config/db')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
    const role = req.query.role
    const search = req.query.search
    let query = 'SELECT * FROM users WHERE id > 0'
    if (role) query += ` AND role='${role}'`
    if (search) query += ` AND (username LIKE '%${search}%' or email LIKE '%${search}%')`
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
      if (results.rows.length>0) { res.status(200).json(results.rows[0]) }
      res.status(404).send()
    })
}

const addUser = async (req, res) => {
  let { username, email, password, role, phone, image } = req.body
  const query = 'INSERT INTO users(username,email,password,role,phone,image) values($1,$2,$3,$4,$5,$6) RETURNING *'
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  password = await bcrypt.hash(password, salt);
  pool.query(query, [username, email, password, role, phone, image], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}


const updateUser = (req, res) => {
  const { username, email, role, phone, image } = req.body
  const query = 'UPDATE users SET username=$1, email=$2, role=$3, phone=$4, image=$5 WHERE id=$6 RETURNING *'
  pool.query(query, [username, email, role, phone, image, req.params.id], (error, results) => {
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
    getUsers, getUserById, addUser, deleteUser, updateUser
}