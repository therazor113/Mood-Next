import UpdateEntry from 'components/utilities/UpdateEntryForm'

const SingleEntry = ({ statEntry, updateStats }) => {
  return (
    <>
      {statEntry &&
      <div>
        <ul style={{ listStyleType: 'none' }}>
          <li>Mood: {statEntry.mood}</li>
          <li>Journal Entry: {statEntry.journal}</li>
          <UpdateEntry updateStats={updateStats} entryId={statEntry.id} />
        </ul>
      </div>
      }
    </>
  )
}

export default SingleEntry
