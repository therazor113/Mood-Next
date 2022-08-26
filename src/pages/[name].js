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
    if (['John', 'Smith'].includes(name)) {
      return {
        props: { user: userData.rows[0], entryExists: true, dev: true }
      }
    }
    const entryExists = new Date()
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
        entryExists={!entryExists}
        dev={dev}
      />
    </Layout>
  )
}

export default UserCharts
