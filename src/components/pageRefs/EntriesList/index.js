import { useEffect, useRef } from 'react'
import DayEntries from './DayEntries'
import WeekEntries from './WeekEntries'
import MonthEntries from './MonthEntries'

import classes from './styles.module.scss'

const EntriesList = ({ type, statsArr, updateStats, cardIndex }) => {
  const scrollRef = useRef()

  // Scroll to top of entries when opened
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])

  return (
    <div className={classes.container} ref={scrollRef}>
      {type === 'day' &&
        <DayEntries
          statsArr={statsArr}
          updateStats={updateStats}
        />
      }
      {type === 'week' &&
        <WeekEntries
          statsArr={statsArr}
          updateStats={updateStats}
        />
      }
      {type === 'month' &&
        <MonthEntries
          statsArr={statsArr}
          updateStats={updateStats}
          cardIndex={cardIndex}
        />
      }
  </div>
  )
}

export default EntriesList
