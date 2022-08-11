import pool from 'lib/db'

const getUserByName = async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE name = $1', [req.query.name])
    res.json(user.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

export default getUserByName
