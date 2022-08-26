import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import UserPageRef from 'components/pageRefs/UserPageRef'
import { authUser } from 'middleware/ApiAuth'
import Layout from 'components/core/Layout'
import pool from 'lib/db'

export const getServerSideProps = async (req, res) => {
  try {
    const redirect = { destination: '/', permanent: false }
    const { name } = req.query
    const userData = await pool.query('SELECT userid, name FROM users WHERE name = $1', [name])
    if (!userData.rows[0]) {
      return { redirect }
    }
    const auth = authUser(req, res)
    const date = new Date()
    const timeStamp = {
      date: date.toLocaleDateString('en-CA'),
      hour: date.getHours()
    }
    if (['John', 'Smith'].includes(name)) {
      return {
        props: { user: userData.rows[0], entryExists: true, dev: true }
      }
    }
    const entryExists = await pool.query(
      'SELECT EXISTS (SELECT * FROM moods WHERE userid = $1 AND time = $2 AND date = $3)',
      [userData.rows[0].userid, timeStamp.hour, timeStamp.date]
    )
    if (auth.userid === userData.rows[0].userid) {
      return {
        props: { user: userData.rows[0], entryExists: entryExists.rows[0].exists }
      }
    } else {
      return { redirect }
    }
  } catch (err) {
    console.error(err.message)
  }
}

const UserCharts = ({ user, entryExists, dev }) => {
  const { setFavicon } = useContext(FaviconContext)
  useEffect(() => {
    setFavicon('/chart.ico')
  }, [setFavicon])
  console.log(entryExists)
  return (
    <Layout title={'Charts'} log={'out'}>
      <UserPageRef
        user={user}
        entryExists={entryExists}
        dev={dev}
      />
    </Layout>
  )
}

export default UserCharts
