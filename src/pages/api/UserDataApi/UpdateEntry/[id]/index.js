import pool from 'lib/db'

const UpdateEntryByid = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      const { entry } = req.body
      const { mood } = req.body
      await pool.query('UPDATE moods SET mood = $1, journal = $2 WHERE id = $3',
        [mood, entry, req.query.id]
      )
      res.json(`Journal Updated: entry ${entry} mood: ${mood}`)
    } else {
      res.json('only \'PUT\' requests here')
    }
  } catch (err) {
    console.error(err.message)
  }
}

export default UpdateEntryByid