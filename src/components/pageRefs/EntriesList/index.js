import UpdateEntryForm from 'components/utilities/UpdateEntryForm'

const EntriesList = ({ statsArr, cardIndex, updateStats, updateWeekStats }) => {
  return (
    <div>

      {statsArr &&
        statsArr?.[cardIndex]?.[1].map((userStats) => (
          <ul style={{ listStyleType: 'none' }}
          key={userStats.id}
          >
            <li>Mood: {userStats.mood}</li>
            <li>Journal Entry: {userStats.journal}</li>
            <UpdateEntryForm
              updateStats={updateStats}
              updateWeekStats={updateWeekStats}
              entryId={userStats.id}
            />
          </ul>
        ))
      }
  </div>
  )
}

export default EntriesList
