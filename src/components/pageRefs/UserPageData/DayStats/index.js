const DayStats = async (handleFetch, user, setStats, setMoods, setDateTitle, counter, dev) => {
  const dayNameArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const date = dev ? new Date('Thu Aug 15 2022') : new Date()
  date.setDate(date.getDate() + counter)
  const monthName = date.toLocaleString('en-US', { month: 'short' })
  setDateTitle(prev => {
    return {
      ...prev,
      day: {
        day: `${dayNameArr[date.getDay()]}, ${monthName} ${date.getDate()}`,
        year: date.getFullYear()
      }
    }
  })

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
