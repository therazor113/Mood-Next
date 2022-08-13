/* eslint-disable no-unused-vars */
import pool from 'lib/db'

const CreateUserByName = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      const { entry } = req.body
      const { mood } = req.body
      // const user = await pool.query('SELECT * FROM users WHERE date = $1', [entryDate])
      // if (user.rows[0]) {
      // res.json('Entry already made for that date')
      // } else {
      const newUser = await pool.query('UPDATE dailymoods SET mood = $1, journal = $2 WHERE id = $3',
        [mood, entry, req.query.id]
      )
      res.json(`Journal Updated: entry ${entry} mood: ${mood}`)
      // }
    } else {
      res.json('only \'PUT\' requests here')
    }
  } catch (err) {
    console.error(err.message)
  }
}

export default CreateUserByName
