import UserPageRef from 'components/pageRefs/UserPageRef'

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

const userPage = ({ user }) => {
  return (
    <div>
      <UserPageRef user={user} />
    </div>
  )
}

export default userPage
