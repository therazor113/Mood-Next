const UpdateEntry = async (handleFetch, inputEntry, moodId, entryId) => {
  const path = `/UserDataApi/UpdateEntry/${entryId}`
  const body = { entry: inputEntry, mood: moodId }
  return await handleFetch(path, 'PUT', body)
}

export default UpdateEntry
