import UpdateEntryForm from 'components/utilities/UpdateEntryForm'
import { useEffect, useRef } from 'react'

import classes from './styles.module.scss'

const EntriesList = ({ type, statsArr, updateStats, cardData }) => {
  const scrollRef = useRef()

  // Scroll to top when entries are opened
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])

  return (
    <div className={classes.container} ref={scrollRef}>
      {type === 'day' && statsArr &&
        <ul key={statsArr.id}>
          <li>{statsArr.date}</li>
          <li>Mood: {statsArr.mood}</li>
          <li>Journal Entry: {statsArr.journal}</li>
          <UpdateEntryForm
            updateStats={updateStats}
            entryId={statsArr.id}
          />
        </ul>
      }

      {type === 'week' && statsArr &&
        statsArr.map((userStats) => (
          <ul key={userStats.id}>
            <li>Hour: {
             userStats.time < 12
               ? `${userStats.time} AM`
               : userStats.time === 12
                 ? `${userStats.time} PM`
                 : userStats.time === 24
                   ? `${userStats.time - 12} AM`
                   : `${userStats.time - 12} PM`
                // Sometimes it just be like that
                }
            </li>
            <li>Mood: {userStats.mood}</li>
            <li>Journal Entry: {userStats.journal}</li>
            <UpdateEntryForm
              updateStats={updateStats}
              entryId={userStats.id}
            />
          </ul>
        ))
      }

      {type === 'month' && statsArr &&
        statsArr.map(userStat => {
          if (userStat.mood === cardData) {
            return (
          <ul key={userStat.id}>
            <li>Mood: {userStat.mood}</li>
            <li>Journal Entry: {userStat.journal}</li>
            <UpdateEntryForm
              updateStats={updateStats}
              entryId={userStat.id}
            />
          </ul>
            )
          } else return undefined
        })
      }
  </div>
  )
}

export default EntriesList
