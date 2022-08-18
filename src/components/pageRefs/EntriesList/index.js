import UpdateEntryForm from 'components/utilities/UpdateEntryForm'

const EntriesList = ({ statsArr, cardIndex, updateStats, cardData }) => {
  return (
    <div>
      {cardData && cardIndex !== null &&
        statsArr.map(userStat => {
          if (userStat.mood === cardData) {
            return (
          <ul style={{ listStyleType: 'none' }}
          key={userStat.id}
          >
            <li>Mood: {userStat.mood}</li>
            <li>Journal Entry: {userStat.journal}</li>
            <UpdateEntryForm
              updateStats={updateStats}
              entryId={userStat.id}
            />
          </ul>
            )
          } return (null)
        })
      }

      {statsArr[cardIndex]?.entries && cardIndex !== null &&
        statsArr[cardIndex]?.entries.map((userStats) => (
          <ul style={{ listStyleType: 'none' }}
          key={userStats.id}
          >
            <li>Mood: {userStats.mood}</li>
            <li>Journal Entry: {userStats.journal}</li>
            <UpdateEntryForm
              updateStats={updateStats}
              entryId={userStats.id}
            />
          </ul>
        ))
      }
  </div>
  )
}

export default EntriesList
