const CheckStats = async (handleFetch, setEntryExists, userid) => {
  const date = new Date()
  const timeStamp = {
    date: date.toLocaleDateString('en-CA'),
    hour: date.getHours()
  }
  const path = `/UserDataApi/CheckEntry/${userid}`
  const body = { timeStamp }
  const data = await handleFetch(path, 'POST', body)
  setEntryExists(data)
}

export default CheckStats
