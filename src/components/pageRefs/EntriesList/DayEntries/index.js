import EntryCard from 'components/utilities/EntryCard'

import { entryBackgrounds, entryColors } from '../EntryVariables'

const DayEntries = ({ statsArr, updateStats }) => {
  return (
    <ul
      style={{
        background: `${entryBackgrounds[statsArr.mood - 1]}`,
        border: `1px solid ${entryColors[statsArr.mood - 1]}`
      }}
      key={statsArr.id}
    >
      <li>{statsArr.date}</li>

      <EntryCard
        userStats={statsArr}
        updateStats={updateStats}
        entryId={statsArr.id}
      />

    </ul>
  )
}

export default DayEntries
