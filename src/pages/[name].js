import MoodChart from 'components/pageRefs/MoodChart'
import CreateEntry from 'components/utilities/Testing/CreateEntry'
import UpdateEntry from 'components/utilities/Testing/UpdateEntry'

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
    statNums.push(statsData[i].mood)
  }

  return {
    props: { user: userData, stats: statsData, statMoods: statNums }
  }
}

const UserInfo = ({ user, stats, statMoods }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <MoodChart stats={stats} statMoods={statMoods} />
      <CreateEntry userid={user.userid} />
      {stats.map((userStats) => (
          <ul style={{ listStyleType: 'none' }} key={userStats.id}>
            <li>Mood: {userStats.mood}</li>
            <li>Journal Entry: {userStats.journal}</li>
            <UpdateEntry journalId={userStats.id} />
          </ul>
      ))}
    </div>
  )
}

export default UserInfo
