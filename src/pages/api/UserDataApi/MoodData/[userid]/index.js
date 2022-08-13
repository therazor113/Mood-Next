import pool from 'lib/db'

const getAllDailyMoodsById = async (req, res) => {
  try {
    const dailyMoods = await pool.query('SELECT id, mood, journal FROM dailymoods WHERE userid = $1 ORDER BY id',
      [req.query.userid])
    res.json(dailyMoods.rows)
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllDailyMoodsById
