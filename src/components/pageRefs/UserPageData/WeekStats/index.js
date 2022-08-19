const WeekStats = async (handleFetch, user, setStats, setMoods) => {
  const data = await handleFetch(`/UserDataApi/GetEntries/${user.userid}/GetWeek/${new Date().getWeek()}`, 'GET')
  setStats(prev => ({ ...prev, week: data[0] }))
  setMoods(prev => ({ ...prev, week: data[1] }))
}

export default WeekStats
