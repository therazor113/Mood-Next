import UpdateEntry from 'components/utilities/Testing/UpdateEntry'

const JournalList = ({ statsArr, updateStats }) => {
  return (
    <div>
      {statsArr.map((userStats) => (
        <ul style={{ listStyleType: 'none' }} key={userStats.id}>
          <li>Mood: {userStats.mood}</li>
          <li>Journal Entry: {userStats.journal}</li>
          <UpdateEntry updateStats={updateStats} journalId={userStats.id} />
        </ul>
      ))}
  </div>
  )
}

export default JournalList
