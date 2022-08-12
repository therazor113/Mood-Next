import Layout from 'components/core/Layout'
import CreateUser from 'components/utilities/Testing/CreateUser'
import LoginUser from 'components/utilities/Testing/LoginUser'

function Home () {
  return (
    <Layout>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <CreateUser />
        <LoginUser />
      </div>
    </Layout>
  )
}

export default Home
