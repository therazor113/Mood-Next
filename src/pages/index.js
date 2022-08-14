import Layout from 'components/core/Layout'
import CreateUser from 'components/utilities/CreateUserForm'
import SignInForm from 'components/utilities/SignInForm'

function Home () {
  return (
    <Layout>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <CreateUser />
        <SignInForm />
      </div>
    </Layout>
  )
}

export default Home
