/* eslint-disable no-unused-vars */
import pool from 'lib/db'

const CreateUserByName = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name } = req.body
      if (!name) {
        res.json('Please enter a name')
        return
      }
      const userExists = await pool.query('SELECT EXISTS (SELECT name FROM users WHERE name = $1)', [name])
      if (userExists.rows[0].exists) {
        res.json('Please use a different name')
      } else {
        const newUser = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name])
        res.json(newUser.rows[0])
      }
    } else {
      res.json('only \'POST\' requests here')
    }
  } catch (err) {
    console.error(err.message)
  }
}

export default CreateUserByName
