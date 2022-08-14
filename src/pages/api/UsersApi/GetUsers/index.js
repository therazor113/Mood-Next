import pool from 'lib/db'

const getUserByName = async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users')
    res.json(user.rows)
  } catch (err) {
    console.error(err.message)
  }
}

export default getUserByName
