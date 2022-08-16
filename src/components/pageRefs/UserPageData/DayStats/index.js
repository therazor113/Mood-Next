import useAPI from 'hooks/useAPI'

const DayStats = async (setStats, setMoods, user, dateStamp) => {
  const path = `/UserDataApi/GetEntries/${user.userid}/${dateStamp}`
  const data = await useAPI(path, 'GET')
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
