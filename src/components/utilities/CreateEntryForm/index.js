import { useState, useEffect } from 'react'
import MoodIcons from 'components/pageRefs/UserPageRef/MoodIcons'
import CreateEntry from './CreateEntry'
import useAPI from 'hooks/useAPI'

import classes from './styles.module.scss'

const CreateEntryForm = ({ updateStats, userid }) => {
  const [currentMood, setCurrentMood] = useState(null)
  const [inputEntry, setInputEntry] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const [handleFetch] = useAPI()

  useEffect(() => currentMood ? setShow(true) : setShow(false), [currentMood])

  const handleEnter = async () => {
    if (!inputEntry || !currentMood) return
    setLoading(true)
    const data = await CreateEntry(handleFetch, inputEntry, currentMood, userid)
    if (!data) {
      setMessage('An Error has occurred')
      setTimeout(() => setMessage(''), 1500)
    }
    setLoading(false)
    updateStats()
  }

  const handleInputEntry = (e) => {
    if (e.target.value.length > 725) return
    setInputEntry(e.target.value)
  }

  return (
    <main className={classes.container}>
      {!show &&
      <div className={classes.selectMood}>
        <h2>How are you feeling?</h2>
        <MoodIcons setCurrentMood={setCurrentMood} />
      </div>
      }

      {show &&
      <div className={classes.journalEntry} >
        <h2>Journal</h2>
        <textarea
          name='message'
          aria-label='Journal'
          placeholder='Whats on your mind?'
          value={inputEntry}
          onChange={handleInputEntry}
        />
        <input
          type='button'
          value={loading ? 'Sending...' : 'Send'}
          onClick={handleEnter}
        />
        <p>{message}</p>
        <button onClick={() => {
          setCurrentMood(null)
          setInputEntry('')
        }}>Cancel</button>
      </div>
      }
    </main>
  )
}

export default CreateEntryForm
