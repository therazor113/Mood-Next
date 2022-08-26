import pool from 'lib/db'

const CheckEntry = async (req, res) => {
  try {
    const { userid } = req.query
    const { timeStamp } = req.body
    const entryExists = await pool.query(
      'SELECT EXISTS (SELECT * FROM moods WHERE userid = $1 AND time = $2 AND date = $3)',
      [userid, timeStamp.hour, timeStamp.date]
    )
    res.json(entryExists.rows[0].exists)
  } catch (err) {
    console.error(err.message)
  }
}

export default CheckEntry
