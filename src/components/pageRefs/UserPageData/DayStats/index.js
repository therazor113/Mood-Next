const DayStats = async (handleFetch, user, setStats, setMoods, dev) => {
  const getData = async () => {
    if (dev) {
      const devData = await handleFetch(
        `/UserDataApi/GetEntries/${user.userid}/GetDay/2022-08-15`,
        'GET'
      )
      return devData
    } else {
      const userData = await handleFetch(
        `/UserDataApi/GetEntries/${user.userid}/GetDay/${new Date().toLocaleDateString('en-CA')}`,
        'GET'
      )
      return userData
    }
  }

  const data = await getData()
  setStats(prev => ({ ...prev, day: data }))
  setMoods(prev => {
    const dayArr = []
    for (let i = 0; i < data.length; i++) {
      dayArr.push(data[i].mood)
    }
    return { ...prev, day: dayArr }
  })
}

export default DayStats
