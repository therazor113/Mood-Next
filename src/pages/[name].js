import { useState } from 'react'
import MoodChart from 'components/pageRefs/MoodChart'
import CreateEntry from 'components/utilities/CreateEntryForm'

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
  const date = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
  const statsRes = await fetch(`http://localhost:3000/api/UserDataApi/GetEntries/${userData.userid}/${date}`)
  const moodsArr = []
  const statsData = await statsRes.json()
  for (let i = 0; i < statsData.length; i++) {
    moodsArr.push(statsData[i].mood)
  }

  return {
    props: { statsData, moodsArr, user: userData }
  }
}

const UserInfo = ({ statsData, moodsArr, user }) => {
  const [dayMoodsArr, setDayMoodsArr] = useState(moodsArr)
  const [dayStatsArr, setDayStatsArr] = useState(statsData)
  const [weekMoodsArr, setWeekMoodsArr] = useState('')
  const [weekStatsArr, setWeekStatsArr] = useState('')

  const updateStats = async () => {
    const date = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 10)
    const statsRes = await fetch(`http://localhost:3000/api/UserDataApi/GetEntries/${user.userid}/${date}`)
    const moodsArr = []
    const dayData = await statsRes.json()
    for (let i = 0; i < dayData.length; i++) {
      moodsArr.push(dayData[i].mood)
    }
    setDayMoodsArr(moodsArr)
    setDayStatsArr(dayData)
  }
  const getWeekStats = async () => {
    const week = new Date().getWeek()
    const statsRes = await fetch(
      `http://localhost:3000/api/UserDataApi/GetEntries/${user.userid}/GetWeek/${week}`
    )
    const weekData = await statsRes.json()
    const sorted = weekData.reduce((p, c) => {
      if (!p[c.date]) p[c.date] = []
      p[c.date].push(c)
      return p
    }, {})
    const newArr = Object.entries(sorted)
    const newArr2 = []
    for (let i = 0; i < newArr.length; i++) {
      const sorted2 = newArr[i][1].reduce((p, c) => {
        p[c.date] = (p[c.date] || 0) + c.mood
        return p
      }, {})
      newArr2.push(Object.entries(sorted2)[0][1] / newArr[i][1].length)
    }

    setWeekMoodsArr(newArr2)
    setWeekStatsArr(newArr)
  }
  return (
    <div>
      <button onClick={() => getWeekStats()}>Test</button>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <MoodChart
      title={'Todays Moods'}
      stats={dayStatsArr}
      Moods={dayMoodsArr}
      updateStats={updateStats}
      />
      {weekMoodsArr && weekStatsArr &&
      <MoodChart
      title={'This Weeks Moods'}
      stats={weekStatsArr}
      Moods={weekMoodsArr}
      updateStats={updateStats}
      updateWeekStats={getWeekStats}
      />}
      <CreateEntry updateStats={updateStats} userid={user.userid} />
    </div>
  )
}

export default UserInfo
