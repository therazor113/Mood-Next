const WeekStats = async (handleFetch, user, setStats, setMoods, setDateTitle, counter, dev) => {
  const date = new Date()
  date.setDate(date.getDate() + counter)
  const monthWeek = Math.ceil(date.getDate() / 7)
  const monthName = date.toLocaleString('en-US', { month: 'short' })
  setDateTitle(prev => { return { ...prev, week: `Week ${monthWeek} of ${monthName}` } })
  const getData = async () => {
    if (dev) {
      const devData = await handleFetch(
        `/UserDataApi/GetEntries/${user.userid}/GetWeek/33`,
        'GET'
      )
      return devData
    } else {
      const userData = await handleFetch(
        `/UserDataApi/GetEntries/${user.userid}/GetWeek/${new Date().getWeek() + counter / 7}`,
        'GET'
      )
      return userData
    }
  }

  const data = await getData()
  setStats(prev => {
    prev.week = [null, null, null, null, null, null, null]
    for (let i = 0; i < prev.week.length; i++) {
      if (data[1]?.[i]) {
        prev.week[data[1][i].weekday] = data[0][i].entries
      }
    }
    return { ...prev, week: prev.week }
  })
  setMoods(prev => {
    prev.week = [null, null, null, null, null, null, null]
    for (let i = 0; i < prev.week.length; i++) {
      if (data[1]?.[i]) {
        prev.week[data[1][i].weekday] = data[1][i].avg
      }
    }
    return { ...prev, week: prev.week }
  })
}

export default WeekStats
