import MoodChart from 'components/pageRefs/MoodChart'

const UserInfo = ({ user, stats }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <MoodChart stats={stats} />
    </div>
  )
}

export default UserInfo

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/UsersApi/UsersData')
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
  const userRes = await fetch(`http://localhost:3000/api/UsersApi/UsersData/${name}`)
  const userData = await userRes.json()
  const statsRes = await fetch(`http://localhost:3000/api/UserDataApi/MoodData/${userData.userid}`)
  const statsData = await statsRes.json()

  return {
    props: { user: userData, stats: statsData }
  }
}
