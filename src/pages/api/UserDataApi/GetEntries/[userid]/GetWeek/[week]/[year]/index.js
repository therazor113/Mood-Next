import pool from 'lib/db'

const getAllMoodsById = async (req, res) => {
  try {
    const { userid, week, year } = req.query

    console.log(`${userid} ${week} ${year}`)

    const moods = await pool.query(
      `SELECT weekday,
        json_agg(json_build_object('id', id, 'mood', mood, 'time', time, 'date', date, 'journal', journal)
          ORDER BY time) AS entries
            FROM moods WHERE userid = $1 AND weekyear = $2 AND date LIKE $3
              GROUP BY weekday ORDER BY weekday`,
      [userid, week, `${year}%`]
    )
    const avgMoods = await pool.query(
      `SELECT weekday, ROUND(AVG(mood),2) AS avg FROM moods
        WHERE userid = $1 AND weekyear = $2 AND date LIKE $3
          GROUP BY weekday ORDER BY weekday`,
      [userid, week, `${year}%`]
    )
    res.json([moods.rows, avgMoods.rows])
  } catch (err) {
    console.error(err.message)
  }
}

export default getAllMoodsById
