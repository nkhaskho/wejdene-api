const { pool } = require('../config/db')
const bcrypt = require('bcrypt')
const { sendEmail } = require('../services/email-service')

const getUsers = async (req, res) => {
    const role = req.query.role
    const search = req.query.search
    let query = 'SELECT * FROM users WHERE id > 0'
    if (role) query += ` AND role='${role}'`
    if (search) query += ` AND (username LIKE '%${search}%' or fullName LIKE '%${search}%')`
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
  let { username, email, fullname, password, role, phone, image } = req.body
  const query = 'INSERT INTO users(username,email,fullname,password,role,phone,image) values($1,$2,$3,$4,$5,$6,$7) RETURNING *'
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  hashedPassword = await bcrypt.hash(password, salt);
  pool.query(query, [username, email, fullname, hashedPassword, role, phone, image], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else {
      // Send welcome email
      sendEmail(email, "Welcome to WIMBEE platform", `
        Hi ${fullname},\n
        Your account has been created with the unique ID: ${results.rows[0].id},\n
        You could now access to WIMBEE app using your following credentials:
          * username: ${username}
          * password: ${password}\n
        Regards,
        WIMBEE team
      `);
      res.status(200).json(results.rows[0])
    }
  })
}


const updateUser = (req, res) => {
  const { username, email, fullname, role, phone, image } = req.body
  const query = 'UPDATE users SET username=$1, email=$2, fullname=$3, role=$4, phone=$5, image=$6 WHERE id=$7 RETURNING *'
  pool.query(query, [username, email, fullname, role, phone, image, req.params.id], (error, results) => {
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