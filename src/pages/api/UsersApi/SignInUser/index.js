import pool from 'lib/db'
import bcrypt from 'bcryptjs'
import { setCookie } from 'cookies-next'
import { createToken, maxAge } from 'middleware/ApiAuth'

const getUserName = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.json('only \'POST\' requests here')
      return
    }
    const { name, password, keepToken } = req.body
    const userExists = await pool.query(
      'SELECT EXISTS (SELECT name FROM users WHERE name = $1)',
      [name]
    )
    if (!userExists.rows[0].exists) {
      res.json(false)
      return
    }
    const user = await pool.query(
      'SELECT * FROM users WHERE name = $1',
      [name]
    )
    if (!user.rows[0].password) {
      res.json(false)
      return
    }
    const validate = await bcrypt.compare(password, user.rows[0].password)
    if (!validate) {
      res.json(false)
      return
    }
    const token = createToken(user.rows[0].userid, user.rows[0].name)
    setCookie('jwt', token, { req, res, httpOnly: true, expires: keepToken ? maxAge : false })
    res.json(user.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

export default getUserName
