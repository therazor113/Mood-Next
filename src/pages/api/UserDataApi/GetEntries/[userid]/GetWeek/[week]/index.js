import pool from 'lib/db'

const getAllMoodsById = async (req, res) => {
  try {
    const { userid, week } = req.query
    const moods = await pool.query(
      'SELECT weekday, json_agg(json_build_object(\'id\', id, \'mood\', mood, \'time\', time, \'journal\', journal) ORDER BY time) AS entries FROM moods WHERE userid = $1 AND weekyear = $2 GROUP BY weekday ORDER BY weekday',
      [userid, week]
    )
    const avgMoods = await pool.query(
      'SELECT weekday, ROUND(AVG(mood),2) AS avg FROM moods WHERE userid = $1 AND weekyear = $2 GROUP BY weekday ORDER BY weekday',
      [userid, week]
    )
    res.json([moods.rows, avgMoods.rows])
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllMoodsById
