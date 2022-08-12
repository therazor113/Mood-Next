/* eslint-disable no-unused-vars */
import pool from 'lib/db'

const CreateUserByName = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name } = req.body
      const user = await pool.query('SELECT * FROM users WHERE name = $1', [name])
      if (user.rows[0]) {
        res.json('Please use a different name')
      } else {
        const newUser = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name])
        res.json(`User ${name} created`)
      }
    } else {
      res.json('only \'POST\' request here')
    }
  } catch (err) {
    console.error(err.message)
  }
}

export default CreateUserByName
