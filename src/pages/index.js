import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import Layout from 'components/core/Layout'
import SignInCard from 'components/pageRefs/SignInCard'

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
