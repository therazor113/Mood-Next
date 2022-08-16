import pool from 'lib/db'

const getUserName = async (req, res) => {
  try {
    const { name } = req.query
    const user = await pool.query('SELECT * FROM users WHERE name = $1', [name])
    res.json(user.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

export default getUserName
