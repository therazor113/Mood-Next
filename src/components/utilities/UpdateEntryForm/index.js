import { useState } from 'react'

import classes from './styles.module.scss'
import UpdateEntry from './UpdateEntry'

const UpdateEntryForm = ({ updateStats, entryId }) => {
  const [inputEntry, setInputEntry] = useState('')
  const [inputMood, setInputMood] = useState('')
  const [message, setMessage] = useState('')

  const handleEnter = async () => {
    if (!inputEntry || !inputMood) return
    try {
      await UpdateEntry(updateStats, setMessage, inputEntry, inputMood, entryId)
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

export default UpdateEntryForm
