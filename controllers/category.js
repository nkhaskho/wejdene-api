const { pool } = require('../config/db')

const getCategories = async (req, res) => {
    let query = 'SELECT * FROM categories ORDER BY name;'
    await pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else res.status(200).json(results.rows)
    })
}

const getCategoryById = (req, res) => {
    const id = req.params.id
    if (id == null) { res.status(404).json({error: "param id required"}) }
    let query = `SELECT * FROM categories WHERE id=${id};`
    pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows[0])}
    })
}

const addCategory = (req, res) => {
    const query = 'INSERT INTO categories(name) values($1) RETURNING *'
    pool.query(query, [req.body.name], (error, results) => {
      if (error) { console.log(error) }
      else res.status(200).json(results.rows[0])
    })
}

const updateCategory = (req, res) => {
  const query = 'UPDATE categories SET name=$1 WHERE id=$2 RETURNING *'
  pool.query(query, [req.body.name, req.params.id], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}

const deleteCategory = (req, res) => {
  const query = `DELETE FROM categories WHERE id=${req.params.id}`
  pool.query(query, (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows)
  })
}

module.exports = {
    getCategories, getCategoryById, addCategory, deleteCategory, updateCategory
}