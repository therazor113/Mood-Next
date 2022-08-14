import { useState } from 'react'

import classes from './styles.module.scss'

const CreateEntry = ({ updateStats, journalId }) => {
  const [inputEntry, setInputEntry] = useState('')
  const [inputMood, setInputMood] = useState('')
  const [message, setMessage] = useState('')

  const handleEnter = async () => {
    if (!inputEntry || !inputMood) return
    try {
      const createRes = await fetch(`/api/UserDataApi/JournalData/${journalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entry: inputEntry, mood: inputMood })
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
      <button onClick={handleEnter}>Update</button>
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

export default CreateEntry
