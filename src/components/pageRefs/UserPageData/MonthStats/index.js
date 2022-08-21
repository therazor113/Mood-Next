const MonthStats = async (handleFetch, user, setStats, setMoods) => {
  const data = await handleFetch(
    `/UserDataApi/GetEntries/${user.userid}/GetMonth/${new Date().toLocaleDateString('en-CA').slice(0, 7)}`,
    'GET'
  )
  setStats(prev => ({ ...prev, month: data[0] }))
  setMoods(prev => {
    prev.month = [null, null, null, null, null, null, null, null, null]
    for (let i = 0; i < prev.month.length; i++) {
      if (data[1]?.[i]) {
        prev.month[data[1][i].mood - 1] = data[1][i]
      }
    }
    return { ...prev, month: prev.month }
  })
}

export default MonthStats
