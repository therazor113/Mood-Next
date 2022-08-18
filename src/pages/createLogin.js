import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import Layout from 'components/core/Layout'
import CreateCard from 'components/pageRefs/CreateCard'

function CreateUserPage () {
  const { setFavicon } = useContext(FaviconContext)
  useEffect(() => {
    setFavicon('/create.ico')
  }, [setFavicon])
  return (
    <Layout title={'Create Login'}>
      <CreateCard />
    </Layout>
  )
}

export default CreateUserPage
