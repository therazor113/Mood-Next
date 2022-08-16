import { useEffect, useState, useRef } from 'react'
import CreateEntry from 'components/utilities/CreateEntryForm'
import LineDay from 'components/pageRefs/MoodCharts/LineDay'
import LineWeek from 'components/pageRefs/MoodCharts/LineWeek'
import BarMonth from 'components/pageRefs/MoodCharts/BarMonth'

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

const UserPage = ({ user }) => {
  const [dayMoodsArr, setDayMoodsArr] = useState()
  const [dayStatsArr, setDayStatsArr] = useState()
  const [monthMoodsArr, setMonthMoodsArr] = useState()
  const [monthStatsArr, setMonthStatsArr] = useState()
  const [weekMoodsArr, setWeekMoodsArr] = useState()
  const [weekStatsArr, setWeekStatsArr] = useState()
  const updateRef = useRef(() => {})

  updateRef.current = () => {
    DayStats()
    WeekStats()
    MonthStats()
  }
  useEffect(() => {
    updateRef.current()
  }, [])

  const DayStats = async () => {
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

  const MonthStats = async () => {
    const month = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 7)
    const res = await fetch(
      `http://localhost:3000/api/UserDataApi/GetEntries/${user.userid}/GetMonth/${month}`
    )
    const monthData = await res.json()
    const barData = [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    for (let i = 0; i < barData.length; i++) {
      if (monthData[1]?.[i]) {
        barData[monthData[1][i].mood - 1] = monthData[1][i]
      }
    }
    setMonthMoodsArr(barData)
    setMonthStatsArr(monthData[0])
  }

  const WeekStats = async () => {
    const week = new Date().getWeek()
    const statsRes = await fetch(
      `http://localhost:3000/api/UserDataApi/GetEntries/${user.userid}/GetWeek/${week}`
    )
    const weekData = await statsRes.json()

    console.log(weekData[0])
    setWeekMoodsArr(weekData[1])
    setWeekStatsArr(weekData[0])
  }
  return (
    <div>
      <button onClick={() => updateRef.current()}>Update</button>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <CreateEntry updateStats={updateRef.current} userid={user.userid} />
      {dayMoodsArr && dayStatsArr &&
      <LineDay
        title={'Todays Moods'}
        stats={dayStatsArr}
        moods={dayMoodsArr}
        updateStats={updateRef.current}
      />}
      {weekMoodsArr && weekStatsArr &&
      <LineWeek
        title={'This Weeks Moods'}
        stats={weekStatsArr}
        moods={weekMoodsArr}
        updateStats={updateRef.current}
      />}
      {monthMoodsArr && monthStatsArr &&
      <BarMonth
        title={'Monthly Stats'}
        stats={monthStatsArr}
        moods={monthMoodsArr}
        updateStats={updateRef.current}
      />}
    </div>
  )
}

export default UserPage
