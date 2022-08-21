const WeekStats = async (handleFetch, user, setStats, setMoods) => {
  const data = await handleFetch(
    `/UserDataApi/GetEntries/${user.userid}/GetWeek/${new Date().getWeek()}`,
    'GET'
  )
  setStats(prev => ({ ...prev, week: data[0] }))
  setMoods(prev => {
    prev.week = [{}, {}, {}, {}, {}, {}, {}]
    for (let i = 0; i < prev.week.length; i++) {
      if (data[1]?.[i]) {
        prev.week[data[1][i].weekday] = data[1][i].avg
      }
    }
    return { ...prev, week: prev.week }
  })
}

export default WeekStats
