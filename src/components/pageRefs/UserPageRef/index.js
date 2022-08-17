import { useEffect, useState, useRef } from 'react'
import CreateEntryForm from 'components/utilities/CreateEntryForm'
import BarMonth from '../MoodCharts/BarMonth'
import LineDay from '../MoodCharts/LineDay'
import LineWeek from '../MoodCharts/LineWeek'
import DayStats from '../UserPageData/DayStats'
import MonthStats from '../UserPageData/MonthStats'
import WeekStats from '../UserPageData/WeekStats'
import useAPI from 'hooks/useAPI'

const UserPageRef = ({ user }) => {
  const [moods, setMoods] = useState({ day: [], week: [], month: [] })
  const [stats, setStats] = useState({ day: [], week: [], month: [] })
  const updateRef = useRef(() => {})
  const [handleFetch] = useAPI()

  updateRef.current = () => {
    DayStats(handleFetch, user, setStats, setMoods)
    WeekStats(handleFetch, user, setStats, setMoods)
    MonthStats(handleFetch, user, setStats, setMoods)
  }

  useEffect(() => {
    updateRef.current()
  }, [])

  return (
    <div>
      <button onClick={() => { updateRef.current() }}>Update</button>
      <h2>{user.name}</h2>
      <h2>{user.userid}</h2>
      <CreateEntryForm updateStats={updateRef.current} userid={user.userid} />
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

export default UserPageRef
