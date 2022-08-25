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
  const { setFavicon } = useContext(FaviconContext)
  const [dev, setDev] = useState(false)
  useEffect(() => {
    setFavicon('/favicon.ico')
  }, [setFavicon])
  return (
    <Layout title={'Login'} log={'in'}>
        {(!dev && <SignInCard />) || <DevLogin />}
        <h2>-</h2>
        <button
          className={classes.devButton}
          onClick={() => setDev(!dev)}>
          {!dev ? 'Test drive?' : 'Sign In instead?'}
        </button>
    </Layout>
  )
}

export default Home
