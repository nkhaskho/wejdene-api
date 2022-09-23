const { pool } = require('../config/db')

const getStocks = async (req, res) => {
    let query = 'SELECT * FROM stocks WHERE id > 0'
    if (req.query.subcategory) query += `AND subcategory='${req.query.subcategory}'`
    if (req.query.search) query += `AND (name LIKE '%${req.query.search}%' OR model LIKE '${req.query.search}%')`
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
  const { name, model, subcategory, quantity } = req.body
  const query = 'INSERT INTO stocks(name,model,subcategory,quantity) values($1,$2,$3,$4) RETURNING *'
  pool.query(query, [name,model,subcategory,quantity], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}

const updateStock = (req, res) => {
  const { name, model, subcategory, quantity } = req.body
  const query = 'UPDATE stocks SET name=$1, model=$2, subcategory=$3, quantity=$4 WHERE id=$5 RETURNING *'
  pool.query(query, [name, model, subcategory, quantity, req.params.id], (error, results) => {
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