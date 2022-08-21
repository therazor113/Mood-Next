/* eslint-disable no-unused-vars */
import pool from 'lib/db'

const CreateJournalEntry = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.json('only \'POST\' requests here')
      return
    }
    const { userid } = req.query
    const { mood, entry, timeStamp } = req.body
    const entryListFull = await pool.query(
      'SELECT * FROM moods WHERE userid = $1 AND date = $2',
      [userid, timeStamp.date]
    )
    if (entryListFull.rows.length >= 24) {
      res.json(false)
      return
    }
    const entryExists = await pool.query(
      'SELECT EXISTS (SELECT * FROM moods WHERE userid = $1 AND time = $2 AND date = $3)',
      [userid, timeStamp.hour, timeStamp.date]
    )
    if (entryExists.rows[0].exists) {
      res.json(false)
      return
    }
    await pool.query(
      'INSERT INTO moods (mood, journal, date, time, weekday, weekYear, userid) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [mood, entry, timeStamp.date, timeStamp.hour, timeStamp.weekDay, timeStamp.weekYear, userid]
    )
    res.json(`Journal: ${entry} with mood: ${mood} created`)
  } catch (err) {
    console.error(err.message)
  }
}

export default CreateJournalEntry
