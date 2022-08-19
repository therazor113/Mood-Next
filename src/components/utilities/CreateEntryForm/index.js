import { useState } from 'react'
import MoodIcons from 'components/pageRefs/UserPageRef/MoodIcons'
import CreateEntry from './CreateEntry'
import useAPI from 'hooks/useAPI'

import classes from './styles.module.scss'

const CreateEntryForm = ({ updateStats, userid }) => {
  const [currentMood, setCurrentMood] = useState(null)
  const [inputEntry, setInputEntry] = useState('')
  const [message, setMessage] = useState('')
  const [handleFetch] = useAPI()

  const handleEnter = async () => {
    if (!inputEntry || !currentMood) return
    const data = await CreateEntry(handleFetch, inputEntry, currentMood, userid)
    setMessage(data)
    setTimeout(() => setMessage(''), 1500)
    updateStats()
  }

  const handleInputEntry = (e) => {
    if (e.target.value.length > 255) return
    setInputEntry(e.target.value)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleEnter()
    }
  }

  return (
    <main className={classes.container}>
      <p className={classes.message}>{message}</p>
      {currentMood}
      <button onClick={handleEnter}>Create</button>
      <MoodIcons setCurrentMood={setCurrentMood}/>
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
