import EntryCard from 'components/utilities/EntryCard'

import { entryBackgrounds, entryColors } from '../EntryVariables'

const MonthEntries = ({ statsArr, updateStats, cardIndex }) => {
  return (
    statsArr.map(userStats => {
      if (userStats.mood === cardIndex) {
        return (
          <ul
            style={{
              background: `${entryBackgrounds[userStats.mood - 1]}`,
              border: `1px solid ${entryColors[userStats.mood - 1]}`
            }}
            key={userStats.id}
          >
            <li>{userStats.date}</li>

            <EntryCard
              userStats={userStats}
              updateStats={updateStats}
              entryId={userStats.id}
            />
          </ul>
        )
      } else return undefined
    })
  )
}

export default MonthEntries
