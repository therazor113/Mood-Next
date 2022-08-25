const MonthStats = async (handleFetch, user, setStats, setMoods, setDateTitle, counter, dev) => {
  const date = dev ? new Date('Thu Aug 15 2022') : new Date()
  date.setMonth(date.getMonth() + counter)
  setDateTitle(prev => { return { ...prev, month: date.toLocaleString('en-US', { month: 'long' }) } })

  const data = await handleFetch(
    `/UserDataApi/GetEntries/${user.userid}/GetMonth/${date.toLocaleDateString('en-CA').slice(0, 7)}`,
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
