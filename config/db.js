const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

const getUsers = (req, res) => {
    console.log(process.env.PGUSER)
    let getUsersQuery = 'SELECT * FROM users'
    pool.query(getUsersQuery, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows)}
      pool.end() 
    })
}

module.exports = {
    getUsers
}