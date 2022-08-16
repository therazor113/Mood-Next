const date = new Date()
const func = () => new Date()

const getDate = () => {
  return func(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
}

const getWeekDay = () => {
  return date.getDay() === 0 ? 6 : date.getDay() - 1
}

const getWeekYear = () => date.getWeek()

const getHour = () => date.getHours()

export { getDate, getWeekDay, getWeekYear, getHour }
