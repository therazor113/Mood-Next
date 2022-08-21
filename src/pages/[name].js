import { useContext, useEffect } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import UserPageRef from 'components/pageRefs/UserPageRef'
import Layout from 'components/core/Layout'

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/UsersApi/GetUsers')
  const data = await res.json()
  const paths = data.map(user => {
    return {
      params: { name: user.name }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const name = context.params.name
  const userRes = await fetch(`http://localhost:3000/api/UsersApi/GetUsers/${name}`)
  const userData = await userRes.json()

  return {
    props: { user: userData }
  }
}

const UserCharts = ({ user }) => {
  const { setFavicon } = useContext(FaviconContext)
  useEffect(() => {
    setFavicon('/chart.ico')
  }, [setFavicon])
  return (
    <Layout title={'Charts'}>
      <UserPageRef user={user} />
    </Layout>
  )
}

export default UserCharts
