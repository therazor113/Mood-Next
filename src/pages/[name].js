import { useState } from 'react'
import MoodChart from 'components/pageRefs/MoodChart'
import CreateEntry from 'components/utilities/Testing/CreateEntry'
import JournalList from 'components/pageRefs/JournalList'

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
  const statMoods = []
  const statsData = await statsRes.json()
  for (let i = 0; i < statsData.length; i++) {
    statMoods.push(statsData[i].mood)
  }

  return {
    props: { statsData, statMoods, user: userData }
  }
}

const UserInfo = ({ statsData, statMoods, user }) => {
  const [statMoodsArr, setStatMoodsArr] = useState(statMoods)
  const [statsArr, setStatsArr] = useState(statsData)

  const updateStats = async () => {
    const statsRes = await fetch(`http://localhost:3000/api/UserDataApi/MoodData/${user.userid}`)
    const statMoods = []
    const statsData = await statsRes.json()
    for (let i = 0; i < statsData.length; i++) {
      statMoods.push(statsData[i].mood)
    }
    setStatMoodsArr(statMoods)
    setStatsArr(statsData)
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <MoodChart stats={statsArr} statMoods={statMoodsArr} />
      <CreateEntry updateStats={updateStats} userid={user.userid} />
      <JournalList statsArr={statsArr} updateStats={updateStats} />
    </div>
  )
}

export default UserInfo
