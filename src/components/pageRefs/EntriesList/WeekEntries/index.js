import EntryCard from 'components/utilities/EntryCard'

import { entryBackgrounds, entryColors } from '../EntryVariables'

const WeekEntries = ({ statsArr, updateStats }) => {
  return (
    statsArr.map(userStats => (
      <ul
        style={{
          background: `${entryBackgrounds[userStats.mood - 1]}`,
          border: `1px solid ${entryColors[userStats.mood - 1]}`
        }}
        key={userStats.id}
      >
        <li>{userStats.date}</li>
        <li>{
          // 12 hr formatting
          userStats.time === 0
            ? '12 AM'
            : userStats.time < 12
              ? `${userStats.time} AM`
              : userStats.time === 12
                ? `${userStats.time} PM`
                : `${userStats.time - 12} PM`
              // Sometimes it just be like that
              }
        </li>

        <EntryCard
          userStats={userStats}
          updateStats={updateStats}
          entryId={userStats.id}
        />
      </ul>
    ))
  )
}

export default WeekEntries
