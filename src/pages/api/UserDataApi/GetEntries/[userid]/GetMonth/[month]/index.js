import pool from 'lib/db'

const getMonthMoods = async (req, res) => {
  try {
    const { userid, month } = req.query
    const moods = await pool.query(
      'SELECT id, mood, journal FROM moods WHERE userid = $1 AND date LIKE $2',
      [userid, month + '%']
    )
    const countMoods = await pool.query(
      'SELECT mood, COUNT(mood) FROM moods WHERE userid = $1 AND date LIKE $2 GROUP BY mood ORDER BY mood',
      [userid, month + '%']
    )
    res.json([moods.rows, countMoods.rows])
  } catch (err) {
    console.error(err.message)
  }
}

export default getMonthMoods
