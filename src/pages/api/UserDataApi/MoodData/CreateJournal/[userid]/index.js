/* eslint-disable no-unused-vars */
import pool from 'lib/db'

const CreateJournalEntry = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { entry } = req.body
      const { mood } = req.body
      // const user = await pool.query('SELECT * FROM users WHERE date = $1', [entryDate])
      // if (user.rows[0]) {
      // res.json('Entry already made for that date')
      // } else {
      const journalEntry = await pool.query('INSERT INTO dailymoods (mood, journal, userid) VALUES ($1, $2, $3) RETURNING *',
        [mood, entry, req.query.userid]
      )
      res.json(`Journal: ${entry} with mood: ${mood} created`)
      // }
    } else {
      res.json('only \'POST\' request here')
    }
  } catch (err) {
    console.error(err.message)
  }
}

export default CreateJournalEntry
