/* eslint-disable no-unused-vars */
import pool from 'lib/db'

const CreateJournalEntry = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { entry, mood, date, fullDate } = req.body
      const entryListFull = await pool.query(
        `SELECT * FROM dailymoods WHERE userid = $1 AND CAST(date AS TEXT) LIKE '${date}%'`,
        [req.query.userid]
      )
      if (entryListFull.rows.length >= 8) {
        res.json('You\'ve finished your entries for today!')
        return
      }
      const entryExists = await pool.query(
        'SELECT EXISTS (SELECT * FROM dailymoods WHERE userid = $1 AND date = $2)',
        [req.query.userid, fullDate]
      )
      if (entryExists.rows[0].exists) {
        res.json('Please wait 1 hr for next entry')
        return
      }
      await pool.query(
        'INSERT INTO dailymoods (mood, journal, date, userid) VALUES ($1, $2, $3, $4)',
        [mood, entry, fullDate, req.query.userid]
      )
      res.json(`Journal: ${entry} with mood: ${mood} created`)
    } else {
      res.json('only \'POST\' request here')
    }
  } catch (err) {
    console.error(err.message)
  }
}

export default CreateJournalEntry
