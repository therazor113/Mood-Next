import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import Layout from 'components/core/Layout'
import SignInCard from 'components/pageRefs/SignInCard'
import { authUser } from 'middleware/ApiAuth'
import { hasCookie } from 'cookies-next'

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
  useEffect(() => {
    setFavicon('/favicon.ico')
  }, [setFavicon])
  return (
    <Layout title={'Login'} log={'in'}>
      <SignInCard />
    </Layout>
  )
}

export default Home
