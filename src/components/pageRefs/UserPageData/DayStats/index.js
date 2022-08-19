const DayStats = async (handleFetch, user, setStats, setMoods) => {
  const data = await handleFetch(
    `/UserDataApi/GetEntries/${user.userid}/${new Date().toLocaleDateString('en-CA')}`,
    'GET'
  )
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
