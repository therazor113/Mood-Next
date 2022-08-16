import useAPI from 'hooks/useAPI'

const MonthStats = async (setStats, setMoods, user, monthStamp) => {
  const path = `/UserDataApi/GetEntries/${user.userid}/GetMonth/${monthStamp}`
  const monthData = await useAPI(path, 'GET')
  setStats(prev => ({ ...prev, month: monthData[0] }))
  setMoods(prev => {
    for (let i = 0; i < prev.month.length; i++) {
      if (monthData[1]?.[i]) {
        prev.month[monthData[1][i].mood - 1] = monthData[1][i]
      }
    }
    return { ...prev, month: prev.month }
  })
}

export default MonthStats
