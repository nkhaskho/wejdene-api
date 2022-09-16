const { pool } = require('../config/db')

const getSubCategories = async (req, res) => {
    let query = `SELECT * FROM subcategories`
    if (req.query.category) query += ` WHERE category=${req.query.category}`
    await pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else res.status(200).json(results.rows)
    })
}

const getSubCategoryById = (req, res) => {
    const id = req.params.id
    if (id == null) { res.status(404).json({error: "param id required"}) }
    let query = `SELECT * FROM subcategories WHERE id=${id};`
    pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows[0])}
    })
}

const addSubCategory = (req, res) => {
    const query = 'INSERT INTO subcategories(name,category) VALUES($1,$2) RETURNING *'
    pool.query(query, [req.body.name,req.body.category], (error, results) => {
      if (error) { console.log(error) }
      else res.status(200).json(results.rows[0])
    })
}

const updateSubCategory = (req, res) => {
  const query = 'UPDATE subcategories SET name=$1, category=$2 WHERE id=$3 RETURNING *'
  pool.query(query, [req.body.name, req.body.category, req.params.id], (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows[0])
  })
}

const deleteSubCategory = (req, res) => {
  const query = `DELETE FROM subcategories WHERE id=${req.params.id}`
  pool.query(query, (error, results) => {
    if (error) { res.status(400).json({error: error}) }
    else res.status(200).json(results.rows)
  })
}

module.exports = {
    getSubCategories, getSubCategoryById, addSubCategory, updateSubCategory, deleteSubCategory
}