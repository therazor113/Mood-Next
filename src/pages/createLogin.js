import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import Layout from 'components/core/Layout'
import CreateUserCard from 'components/pageRefs/CreateUserCard'

const CreateUserPage = () => {
  const { setFavicon } = useContext(FaviconContext)
  
  useEffect(() => {
    setFavicon('/create.ico')
  }, [setFavicon])

  return (
    <Layout title={'Create Login'} loggedIn={false}>
      <CreateUserCard />
    </Layout>
  )
}

export default CreateUserPage
