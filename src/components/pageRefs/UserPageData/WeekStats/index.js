const WeekStats = async (handleFetch, user, setStats, setMoods) => {
  const data = await handleFetch(
    `/UserDataApi/GetEntries/${user.userid}/GetWeek/${new Date().getWeek()}`,
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
