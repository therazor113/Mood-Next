import pool from 'lib/db'

const getAllNumbersById = async (req, res) => {
  try {
    const number = await pool.query('SELECT ARRAY_AGG(number) FROM moods WHERE userid = $1', [req.query.number])
    res.json(number.rows[0].array_agg)
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllNumbersById
