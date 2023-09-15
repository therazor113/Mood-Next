import { useContext, useEffect, useState } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import Layout from 'components/core/Layout'
import SignInCard from 'components/pageRefs/SignInCard'
import { authUser } from 'middleware/ApiAuth'
import { hasCookie } from 'cookies-next'
import DevLogin from 'components/pageRefs/DevLogin'

import classes from 'styles/styles.module.scss'

export const getServerSideProps = async (req, res) => {
  try {
    const checkToken = hasCookie('jwt', req, res)
    if (!checkToken) {
      return { props: {} }
    }
    const auth = authUser(req, res)
    return {
      redirect: {
        permanent: false,
        destination: `/${auth.name}`
      }
    }
  } catch (err) {
    console.error(err.message)
  }
}

const Home = () => {
  const [testDrive, setTestDrive] = useState(false)
  const { setFavicon } = useContext(FaviconContext)

  useEffect(() => {
    setFavicon('/favicon.ico')
  }, [setFavicon])

  return (
    <Layout title={'Login'} loggedIn={false}>
      <div className={classes.mainContainer}>
        {(!testDrive && <SignInCard />) || <DevLogin />}
        <h2>-</h2>
        <button
          className={classes.devButton}
          onClick={() => setTestDrive(!testDrive)}>
          {!testDrive ? 'Test drive?' : 'User login?'}
        </button>
      </div>
    </Layout>
  )
}

export default Home
