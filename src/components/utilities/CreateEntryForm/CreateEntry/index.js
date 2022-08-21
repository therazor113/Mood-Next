const CreateEntry = async (handleFetch, inputEntry, currentMood, userid) => {
  const date = new Date()
  const timeStamp = {
    date: date.toLocaleDateString('en-CA'),
    hour: date.getHours(),
    weekDay: date.getDay() === 0 ? 6 : date.getDay() - 1,
    weekYear: date.getWeek() ? date.getWeek() : 24
  }
  const path = `/UserDataApi/CreateEntry/${userid}`
  const body = { entry: inputEntry, mood: currentMood, timeStamp }
  return await handleFetch(path, 'POST', body)
}

export default CreateEntry
