import pool from 'lib/db'

const getAllMoodsById = async (req, res) => {
  try {
    const moods = await pool.query(
      'SELECT weekday, json_agg(json_build_object(\'id\', id, \'mood\', mood, \'journal\', journal) ORDER BY id) AS entries FROM moods WHERE userid = $1 AND weekyear = $2 GROUP BY weekday ORDER BY weekday',
      [req.query.userid, req.query.week]
    )
    const avgMoods = await pool.query(
      'SELECT weekday, ROUND(AVG(mood),2) AS avg FROM moods WHERE userid = $1 AND weekyear = $2 GROUP BY weekday ORDER BY weekday',
      [req.query.userid, req.query.week]
    )
    res.json([moods.rows, avgMoods.rows])
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllMoodsById
