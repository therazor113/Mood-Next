import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import UserPageRef from 'components/pageRefs/UserPageRef'
import { authUser } from 'middleware/ApiAuth'
import Layout from 'components/core/Layout'
import pool from 'lib/db'

export const getServerSideProps = async (req, res) => {
  try {
    const { name } = req.query
    const userData = await pool.query('SELECT userid, name FROM users WHERE name = $1', [name])
    const auth = authUser(req, res)
    if (auth.userid === userData.rows[0].userid) {
      return {
        props: { user: userData.rows[0] }
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }
  } catch (err) {
    console.error(err.message)
  }
}

const UserCharts = ({ user }) => {
  const { setFavicon } = useContext(FaviconContext)
  useEffect(() => {
    setFavicon('/chart.ico')
  }, [setFavicon])
  return (
    <Layout title={'Charts'} log={'out'}>
      <UserPageRef user={user} />
    </Layout>
  )
}

export default UserCharts
