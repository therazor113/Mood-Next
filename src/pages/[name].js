import MoodChart from 'components/pageRefs/MoodChart'
import CreateEntry from 'components/utilities/Testing/CreateEntry'

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
  const statNums = []
  const statsData = await statsRes.json()
  for (let i = 0; i < statsData.length; i++) {
    statNums.push(statsData[i].number)
  }

  return {
    props: { user: userData, stats: statsData, statNumbers: statNums }
  }
}

const UserInfo = ({ user, stats, statNumbers }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <MoodChart stats={stats} statNumbers={statNumbers} />
      <CreateEntry userid={user.userid} />
    </div>
  )
}

export default UserInfo
