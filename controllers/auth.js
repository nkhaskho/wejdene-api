const { pool } = require('../config/db')
const jwt = require("jsonwebtoken");  

const authenticate = async (req, res) => {
    const { username, password } = req.body
    let query = 'SELECT * FROM users WHERE username=$1'
    console.log(username)
    await pool.query(query, [req.body.username], (error, results) => {
      if (error) { res.status(400).json({error: error}) }
      if (results.rows.length>0) {
        token = jwt.sign({
            id: results.rows[0].id,
            email: results.rows[0].email,
            role: results.rows[0].role 
          },
          "secretkeyappearshere",
          { expiresIn: "1000h" }
        );
        res.status(200).json({token: token}) 
      }
      res.status(404).send()
    })
}

module.exports = { authenticate }