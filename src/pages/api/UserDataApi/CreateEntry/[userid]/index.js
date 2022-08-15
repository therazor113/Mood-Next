/* eslint-disable no-unused-vars */
import pool from 'lib/db'

const CreateJournalEntry = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { mood, entry, timeStamp } = req.body
      const entryListFull = await pool.query(
        'SELECT * FROM moods WHERE userid = $1 AND date = $2',
        [req.query.userid, timeStamp.date]
      )
      if (entryListFull.rows.length >= 8) {
        res.json('You\'ve finished your entries for today!')
        return
      }
      const entryExists = await pool.query(
        'SELECT EXISTS (SELECT * FROM moods WHERE userid = $1 AND time = $2)',
        [req.query.userid, timeStamp.hour]
      )
      if (entryExists.rows[0].exists) {
        res.json('Please wait 1 hour for next entry')
        return
      }
      await pool.query(
        'INSERT INTO moods (mood, journal, date, time, weekday, weekYear, userid) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [mood, entry, timeStamp.date, timeStamp.hour, timeStamp.weekDay, timeStamp.weekYear, req.query.userid]
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
