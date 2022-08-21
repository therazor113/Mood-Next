import { useEffect, useState, useRef } from 'react'
import CreateEntryForm from 'components/utilities/CreateEntryForm'
import BarMonth from '../MoodCharts/BarMonth'
import LineDay from '../MoodCharts/LineDay'
import LineWeek from '../MoodCharts/LineWeek'
import DayStats from '../UserPageData/DayStats'
import MonthStats from '../UserPageData/MonthStats'
import WeekStats from '../UserPageData/WeekStats'
import useAPI from 'hooks/useAPI'

import classes from './styles.module.scss'

const UserPageRef = ({ user }) => {
  const [moods, setMoods] = useState({ day: [], week: [], month: [] })
  const [stats, setStats] = useState({ day: [], week: [], month: [] })
  const [handleFetch] = useAPI()
  const updateRef = useRef(() => {})

  updateRef.current = () => {
    // More modular this way
    DayStats(handleFetch, user, setStats, setMoods)
    WeekStats(handleFetch, user, setStats, setMoods)
    MonthStats(handleFetch, user, setStats, setMoods)
  }

  useEffect(() => {
    updateRef.current()
  }, [])

  return (
    <div className={classes.container}>
      <h2 className={classes.welcome}>Welcome! <span>{user.name}</span></h2>

      <CreateEntryForm
        updateStats={updateRef.current}
        userid={user.userid}
      />

      <LineDay
        title={'Todays Moods'}
        classes={classes}
        stats={stats.day}
        moods={moods.day}
        updateStats={updateRef.current}
      />
      <LineWeek
        title={'This Weeks Moods'}
        classes={classes}
        stats={stats.week}
        moods={moods.week}
        updateStats={updateRef.current}
      />
      <BarMonth
        title={'Monthly Stats'}
        classes={classes}
        stats={stats.month}
        moods={moods.month}
        updateStats={updateRef.current}
      />
    </div>
  )
}

export default UserPageRef
