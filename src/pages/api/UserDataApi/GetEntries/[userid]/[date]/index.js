import pool from 'lib/db'

const getAllMoodsById = async (req, res) => {
  try {
    const moods = await pool.query(
      'SELECT id, mood, journal, date, time, weekday FROM moods WHERE userid = $1 AND date = $2 ORDER BY time LIMIT 8',
      [req.query.userid, req.query.date]
    )
    res.json(moods.rows)
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllMoodsById
