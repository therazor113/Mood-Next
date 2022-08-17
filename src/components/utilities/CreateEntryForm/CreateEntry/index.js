import { getDate, getHour, getWeekDay, getWeekYear } from 'helpers/TimeStamps'

const CreateEntry = async (handleFetch, inputEntry, inputMood, userid) => {
  const timeStamp = {
    date: getDate().slice(0, 10),
    hour: getHour(),
    weekDay: getWeekDay(),
    weekYear: getWeekYear()
  }
  const path = `/UserDataApi/CreateEntry/${userid}`
  const body = { entry: inputEntry, mood: inputMood, timeStamp }
  return await handleFetch(path, 'POST', body)
}

export default CreateEntry
