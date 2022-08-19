import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import Layout from 'components/core/Layout'
import LoginCard from 'components/pageRefs/LoginCard'

const Home = () => {
  const { setFavicon } = useContext(FaviconContext)
  useEffect(() => {
    setFavicon('/favicon.ico')
  }, [setFavicon])
  return (
    <Layout title={'Login'}>
      <LoginCard />
    </Layout>
  )
}

export default Home
