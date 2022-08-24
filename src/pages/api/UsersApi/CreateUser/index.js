import pool from 'lib/db'
import bcrypt from 'bcryptjs'
import { setCookie } from 'cookies-next'
import { createToken, maxAge } from 'middleware/ApiAuth'

const CreateUserByName = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.json('only \'POST\' requests here')
      return
    }
    const { name, password } = req.body
    if (!name) {
      res.json('Please enter a name')
      return
    }
    const userExists = await pool.query(
      'SELECT EXISTS (SELECT name FROM users WHERE name = $1)',
      [name]
    )
    if (userExists.rows[0].exists) {
      res.json(false)
      return
    }
    const passHash = await bcrypt.hash(password, 10)
    const newUser = await pool.query(
      'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
      [name, passHash]
    )
    const token = createToken(newUser.rows[0].userid, newUser.rows[0].name)
    setCookie('jwt', token, { req, res, httpOnly: true, maxAge })
    res.json({ userid: newUser.rows[0].userid, name: newUser.rows[0].name })
  } catch (err) {
    console.error(err.message)
  }
}

export default CreateUserByName
