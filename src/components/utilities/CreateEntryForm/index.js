import { useState } from 'react'

import classes from './styles.module.scss'

const CreateEntryForm = ({ updateStats, userid }) => {
  const [inputEntry, setInputEntry] = useState('')
  const [inputMood, setInputMood] = useState('')
  const [message, setMessage] = useState('')

  const handleEnter = async () => {
    if (!inputEntry || !inputMood) return
    try {
      const dateStamp = new Date(
        new Date().getTime() - (new Date().getTimezoneOffset() * 60000)
      ).toISOString().slice(0, 10)
      const timeStamp = `${new Date().getHours()}:00:00`
      const fullDate = dateStamp + ' ' + timeStamp
      const createRes = await fetch(`/api/UserDataApi/CreateEntry/${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entry: inputEntry, mood: inputMood, date: dateStamp, fullDate })
      })
      const data = await createRes.json()
      setMessage(data)
      setTimeout(() => setMessage(''), 1500)
      updateStats()
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleInputEntry = (e) => {
    if (e.target.value.length > 255) return
    setInputEntry(e.target.value)
  }

  const handleInputMood = (e) => {
    if (!/^[1-9]*$/g.test(e.target.value) || e.target.value.length > 1) return
    setInputMood(e.target.value)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleEnter()
    }
  }

  return (
    <main className={classes.container}>
      <p className={classes.message}>{message}</p>
      <button onClick={handleEnter}>Create</button>
      <input
        placeholder='mood: 1-9'
        className={classes.moodInput}
        value={inputMood}
        onChange={handleInputMood}
        onKeyUp={handleKeyUp}
        autoFocus
      />
      <input
        placeholder='Journal Entry'
        className={classes.entryInput}
        value={inputEntry}
        onChange={handleInputEntry}
        onKeyUp={handleKeyUp}
      />
    </main>
  )
}

export default CreateEntryForm
