import useAPI from 'hooks/useAPI'

const UpdateEntry = async (updateStats, setMessage, inputEntry, inputMood, entryId) => {
  const path = `/UserDataApi/UpdateEntry/${entryId}`
  const data = await useAPI(path, 'PUT', { entry: inputEntry, mood: inputMood })
  setMessage(data)
  setTimeout(() => setMessage(''), 1500)
  updateStats()
}

export default UpdateEntry
