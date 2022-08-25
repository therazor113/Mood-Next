const WeekStats = async (handleFetch, user, setStats, setMoods, setDateTitle, counter, dev) => {
  const date = dev ? new Date('Thu Aug 15 2022') : new Date()
  date.setDate(date.getDate() + counter)
  const monthWeek = Math.ceil(date.getDate() / 7)
  const monthName = date.toLocaleString('en-US', { month: 'short' })
  setDateTitle(prev => { return { ...prev, week: `Week ${monthWeek} of ${monthName}` } })

  const data = await handleFetch(
    `/UserDataApi/GetEntries/${user.userid}/GetWeek/${date.getWeek()}`,
    'GET'
  )

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
