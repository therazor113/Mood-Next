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

const UserPageRef = ({ user, entryExists, dev }) => {
  const [counter, setCounter] = useState({ day: 0, week: 0, month: 0 })
  const [dateTitle, setDateTitle] = useState({ day: [], week: [], month: [] })
  const [moods, setMoods] = useState({ day: [], week: [], month: [] })
  const [stats, setStats] = useState({ day: [], week: [], month: [] })
  const updateRef = useRef(() => {})
  const [handleFetch] = useAPI()

  updateRef.current = async () => {
    await DayStats(handleFetch, user, setStats, setMoods, setDateTitle, counter.day, dev)
    await WeekStats(handleFetch, user, setStats, setMoods, setDateTitle, counter.week, dev)
    await MonthStats(handleFetch, user, setStats, setMoods, setDateTitle, counter.month, dev)
  }

  useEffect(() => {
    updateRef.current()
  }, [counter])

  return (
    <div className={classes.container}>
      <h2 className={classes.welcome}>Welcome! <span>{user.name}</span></h2>
      <CreateEntryForm
        updateStats={updateRef.current}
        userid={user.userid}
        entryExists={dev || entryExists}
        dev={dev}
      />
      <LineDay
        classes={classes}
        stats={stats.day}
        moods={moods.day}
        dateTitle={dateTitle.day}
        setCounter={setCounter}
        updateStats={updateRef.current}
      />
      <LineWeek
        classes={classes}
        stats={stats.week}
        moods={moods.week}
        dateTitle={dateTitle.week}
        setCounter={setCounter}
        updateStats={updateRef.current}
      />
      <BarMonth
        classes={classes}
        stats={stats.month}
        moods={moods.month}
        dateTitle={dateTitle.month}
        setCounter={setCounter}
        updateStats={updateRef.current}
      />
    </div>
  )
}

export default UserPageRef
