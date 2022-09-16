const { pool } = require('../config/db')

const getStocks = async (req, res) => {
    let query = 'SELECT * FROM stocks'
    await pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows)}
    })
}

const getStockById = async (req, res) => {
    const id = req.params.id
    if (id == null) { res.status(404).json({error: "param id required"}) }
    let query = `SELECT * FROM stocks WHERE id=${id};`
    await pool.query(query, (error, results) => {
      if (error) { res.status(400).json({error: error}) }
      if (results.rows.length>0) { res.status(200).json(results.rows[0]) }
      res.status(404).send()
    })
}

const addStock = (req, res) => {
  const { name, model, quantity } = req.body
  const query = 'INSERT INTO stocks(name,model,quantity) values($1,$2,$3) RETURNING *'
  pool.query(query, [name,model,quantity], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}

const updateStock = (req, res) => {
  const { name, model, quantity } = req.body
  const query = 'UPDATE stocks SET name=$1, model=$2, quantity=$3 WHERE id=$4 RETURNING *'
  pool.query(query, [name, model, quantity, req.params.id], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}

const deleteStock = (req, res) => {
  const query = `DELETE FROM stocks WHERE id=${req.params.id}`
  pool.query(query, (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows)
  })
}

module.exports = {
    getStocks, getStockById, addStock, deleteStock, updateStock
}