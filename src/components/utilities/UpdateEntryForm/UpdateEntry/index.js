const UpdateEntry = async (handleFetch, inputEntry, inputMood, entryId) => {
  const path = `/UserDataApi/UpdateEntry/${entryId}`
  const body = { entry: inputEntry, mood: inputMood }
  return await handleFetch(path, 'PUT', body)
}

export default UpdateEntry
