import { useContext, useEffect, useRef, useState } from 'react'
import CheckStats from 'components/pageRefs/UserPageData/CheckStats'
import FaviconContext from 'contexts/FaviconContext'
import UserPageRef from 'components/pageRefs/UserPageRef'
import { authUser } from 'middleware/ApiAuth'
import Layout from 'components/core/Layout'
import useAPI from 'hooks/useAPI'
import pool from 'lib/db'

import classes from 'styles/styles.module.scss'

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
    if (auth.userid === userData.rows[0].userid) {
      return {
        props: { user: userData.rows[0], dev: false }
      }
    } else {
      return { redirect }
    }
  } catch (err) {
    console.error(err.message)
  }
}

const UserCharts = ({ user, dev }) => {
  const { setFavicon } = useContext(FaviconContext)
  const [entryExists, setEntryExists] = useState(undefined)
  const [handleFetch] = useAPI()
  const checkRef = useRef(() => {})

  checkRef.current = async () => {
    await CheckStats(handleFetch, setEntryExists, user.userid)
  }

  useEffect(() => {
    checkRef.current()
  }, [])

  useEffect(() => {
    setFavicon('/chart.ico')
  }, [setFavicon])

  return (
    <Layout title={'Charts'} loggedIn={true}>
      <div className={classes.userPageContainer}>
      {entryExists !== undefined &&
        <UserPageRef
          user={user}
          entryExists={dev ? true : entryExists}
          dev={dev}
        />
      }
      </div>
    </Layout>
  )
}

export default UserCharts
