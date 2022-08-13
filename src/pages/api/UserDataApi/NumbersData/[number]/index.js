import pool from 'lib/db'

const getAllDailyMoodsById = async (req, res) => {
  try {
    const dailyMoods = await pool.query('SELECT ARRAY_AGG(mood) FROM moods WHERE userid = $1', [req.query.number])
    res.json(dailyMoods.rows[0].array_agg)
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllDailyMoodsById
