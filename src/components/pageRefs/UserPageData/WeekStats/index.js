import useAPI from 'hooks/useAPI'

const WeekStats = async (setStats, setMoods, user, week) => {
  const path = `/UserDataApi/GetEntries/${user.userid}/GetWeek/${week}`
  const data = await useAPI(path, 'GET')
  setStats(prev => ({ ...prev, week: data[0] }))
  setMoods(prev => ({ ...prev, week: data[1] }))
}

export default WeekStats
