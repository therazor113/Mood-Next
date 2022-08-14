import pool from 'lib/db'

const getUserName = async (req, res) => {
  try {
    const name = await pool.query('SELECT * FROM users WHERE name = $1', [req.query.name])
    res.json(name.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

export default getUserName
