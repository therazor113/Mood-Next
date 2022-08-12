import pool from 'lib/db'

const getAllNumbersById = async (req, res) => {
  try {
    const number = await pool.query('SELECT * FROM moods WHERE userid = $1', [req.query.userid])
    res.json(number.rows)
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllNumbersById
