import pool from 'lib/db'

const getAllMoodsById = async (req, res) => {
  try {
    console.log(req.query)
    const Moods = await pool.query(
      'SELECT id, mood, journal, date, time, weekday FROM moods WHERE userid = $1 AND weekyear = $2 ORDER BY id LIMIT 7',
      [req.query.userid, req.query.week]
    )
    res.json(Moods.rows)
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllMoodsById
