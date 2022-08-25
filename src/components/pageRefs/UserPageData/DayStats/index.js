const DayStats = async (handleFetch, user, setStats, setMoods, setDateTitle, counter, dev) => {
  const date = dev ? new Date('Thu Aug 15 2022') : new Date()
  date.setDate(date.getDate() + counter)
  setDateTitle(prev => { return { ...prev, day: date.toLocaleDateString('en-CA').slice(5, 10) } })

  const data = await handleFetch(
    `/UserDataApi/GetEntries/${user.userid}/GetDay/${date.toLocaleDateString('en-CA')}`,
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
