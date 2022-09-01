const { pool } = require('../config/db')

const getTickets = async (req, res) => {
    let query = 'SELECT * FROM tickets'
    await pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows)}
    })
}

const getTicketById = async (req, res) => {
    const id = req.params.id
    if (id == null) { res.status(404).json({error: "param id required"}) }
    let query = `SELECT * FROM tickets WHERE id=${id};`
    await pool.query(query, (error, results) => {
      if (error) { res.status(400).json({error: error}) }
      if (results.rows.length>0) { res.status(200).json(results.rows[0]) }
      res.status(404).send()
    })
}

const addTicket = (req, res) => {
  const { title, description, status, createdBy } = req.body
  const query = 'INSERT INTO tickets(title,description,status,createdby) values($1,$2,$3,$4) RETURNING *'
  pool.query(query, [title, description, status, createdBy], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}

const updateTicket = (req, res) => {
  const { title, description, status } = req.body
  const query = 'UPDATE users SET title=$1, description=$2, status=$3 WHERE id=$4 RETURNING *'
  pool.query(query, [title, description, status, req.params.id], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}

const deleteTicket = (req, res) => {
  const query = `DELETE FROM tickets WHERE id=${req.params.id}`
  pool.query(query, (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows)
  })
}

module.exports = {
    getTickets, getTicketById, addTicket, deleteTicket, updateTicket
}