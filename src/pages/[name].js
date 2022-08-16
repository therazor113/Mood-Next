import { useEffect, useState, useRef } from 'react'
import CreateEntry from 'components/utilities/CreateEntryForm'
import LineDay from 'components/pageRefs/MoodCharts/LineDay'
import LineWeek from 'components/pageRefs/MoodCharts/LineWeek'
import BarMonth from 'components/pageRefs/MoodCharts/BarMonth'
import DayStats from 'components/pageRefs/UserPageData/DayStats'
import WeekStats from 'components/pageRefs/UserPageData/WeekStats'
import MonthStats from 'components/pageRefs/UserPageData/MonthStats'
import { getDate, getWeekYear } from 'helpers/TimeStamps'

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
  const [stats, setStats] = useState({ day: [], week: [], month: [] })
  const [moods, setMoods] = useState({ day: [], week: [], month: [{}, {}, {}, {}, {}, {}, {}, {}, {}] })
  const updateRef = useRef(() => {})

  updateRef.current = () => {
    DayStats(setStats, setMoods, user, getDate().slice(0, 10))
    WeekStats(setStats, setMoods, user, getWeekYear())
    MonthStats(setStats, setMoods, user, getDate().slice(0, 7))
  }
  useEffect(() => {
    updateRef.current()
  }, [])

  return (
    <div>
      <button onClick={() => { updateRef.current() }}>Update</button>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <CreateEntry updateStats={updateRef.current} userid={user.userid} />
        <LineDay
          title={'Todays Moods'}
          stats={stats.day}
          moods={moods.day}
          updateStats={updateRef.current}
        />
        <LineWeek
          title={'This Weeks Moods'}
          stats={stats.week}
          moods={moods.week}
          updateStats={updateRef.current}
        />
        <BarMonth
          title={'Monthly Stats'}
          stats={stats.month}
          moods={moods.month}
          updateStats={updateRef.current}
        />
    </div>
  )
}

export default UserPage
