import { getDate, getHour, getWeekDay, getWeekYear } from 'helpers/TimeStamps'
import useAPI from 'hooks/useAPI'

const CreateEntry = async (updateStats, setMessage, inputEntry, inputMood, userid) => {
  const timeStamp = {
    date: getDate().slice(0, 10),
    hour: getHour(),
    weekDay: getWeekDay(),
    weekYear: getWeekYear()
  }
  const path = `/UserDataApi/CreateEntry/${userid}`
  const data = await useAPI(path, 'POST', { entry: inputEntry, mood: inputMood, timeStamp })
  setMessage(data)
  setTimeout(() => setMessage(''), 1500)
  updateStats()
}

export default CreateEntry
