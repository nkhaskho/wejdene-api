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
    if (id == null) {
        res.status(404).json({error: "param id required"})
    }
    let query = `SELECT * FROM categories WHERE id=${id};`
    pool.query(query, (error, results) => {
      if (error) { console.log(error) }
      else { res.status(200).json(results.rows)}
    })
}

const addCategory = (req, res) => {
    const name = req.body.name
    pool.query('INSERT INTO categories(name) values($1)', [name], (error, results) => {
      if (error) { console.log(error) }
      else res.status(200).json(results.rows)
    })
}

module.exports = {
    getCategories, getCategoryById, addCategory
}