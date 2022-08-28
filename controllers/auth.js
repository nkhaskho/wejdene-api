const { pool } = require('../config/db')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const authenticate = async (req, res) => {
    const { username, password } = req.body
    let query = 'SELECT * FROM users WHERE username=$1'
    await pool.query(query, [req.body.username], async (error, results) => {
      if (error) { res.status(400).json({error: error}) }
      if (results.rows.length>0) {
        // Check password match
        let matched = await bcrypt.compare(req.body.password, results.rows[0].password)
        if (!matched) {res.status(400).json({error: 'username or password incorrect'})}
        let token = jwt.sign({
          id: results.rows[0].id,
          username: results.rows[0].username,
          role: results.rows[0].role,
          email: results.rows[0].email
          },
          process.env.SECRET,
          { expiresIn: "1000h" }
        );
        res.status(200).json({token: token}) 
      } else {
        res.status(400).json({error: 'username or password incorrect'})
      }
    })
}

module.exports = { authenticate }