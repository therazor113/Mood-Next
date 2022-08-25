import { useState } from 'react'
import MoodIcons from 'components/pageRefs/UserPageRef/MoodIcons'
import CreateEntry from './CreateEntry'
import useAPI from 'hooks/useAPI'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faAngleLeft, faExclamation, faGear } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss'
import FormTextField from '../FormTextField'

const CreateEntryForm = ({ updateStats, userid, entryExists, dev }) => {
  const [showForm, setShowForm] = useState(!entryExists)
  const [currentMood, setCurrentMood] = useState(null)
  const [startEntry, setStartEntry] = useState(false)
  const [textLength, setTextLength] = useState(254)
  const [inputEntry, setInputEntry] = useState('')
  const [handleFetch] = useAPI()

  const handleEnter = async () => {
    if (!inputEntry || !currentMood) return
    const data = await CreateEntry(handleFetch, inputEntry, currentMood, userid)
    if (data) {
      setInputEntry('')
      setTextLength(254)
      updateStats()
    }
    setShowForm(false)
    setCurrentMood(null)
    setStartEntry(false)
  }

  const handleChange = (e) => {
    if (/\n/g.test(e.target.value) || e.target.value.length > 254) return
    setInputEntry(e.target.value)
    setTextLength(254 - e.target.value.length)
  }

  return (
    <main className={classes.container}>
      <div
        className={classes.startEntry}
        onClick={() => showForm && setStartEntry(true)}
        style={startEntry ? { transform: 'translate(-190%, 10%)', opacity: 0 } : undefined}
      >
        <span>
          <FontAwesomeIcon icon={dev ? faGear : showForm ? faPlus : faExclamation} />
        </span>
        <h2>{dev ? 'Dev Mode' : showForm ? 'Add a new entry?' : 'Available in 1 hour'}</h2>
      </div>
      <div
        className={classes.selectMood}
        style={
          !startEntry
            ? { transform: 'translateX(140%)', opacity: 0 }
            : !currentMood
                ? { transform: 'translateX(0%)', opacity: 1 }
                : { transform: 'translateX(-140%)', opacity: 0 }
            }
      >
        <h2>How are you feeling?</h2>
        <MoodIcons
          setCurrentMood={setCurrentMood}
        />
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={classes.arrow}
          onClick={() => setStartEntry(false)}
        />
      </div>

      <div
        className={classes.journalEntry}
        style={currentMood && { transform: 'translateX(0)', opacity: 1 }}
      >
        <FormTextField
          handleChange={handleChange}
          inputEntry={inputEntry}
          textLength={textLength}
          classes={classes}
        />
        <input
          type='button'
          value='Send'
          onClick={handleEnter}
        />
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={classes.arrow}
          onClick={() => setCurrentMood(null)}
        />
      </div>
    </main>
  )
}

export default CreateEntryForm
