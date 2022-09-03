import { useState } from 'react'
import UpdateIcon from './UpdateIcon'
import FormTextField from '../FormTextField'
import UpdateEntry from './UpdateEntry'
import useAPI from 'hooks/useAPI'

import { entryColors, entryIcons } from 'components/pageRefs/EntriesList/EntryVariables'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss'

const EntryCard = ({ userStats, updateStats, entryId }) => {
  const [showEdit, setShowEdit] = useState(false)
  const [textLength, setTextLength] = useState(254)
  const [inputEntry, setInputEntry] = useState('')
  const [moodId, setMoodId] = useState(null)
  const [handleFetch] = useAPI()

  const handleEnter = async () => {
    if (!inputEntry) return
    await UpdateEntry(handleFetch, inputEntry, moodId, entryId)
    updateStats()
    setShowEdit(false)
  }

  const handleChange = (e) => {
    if (e.target.value.length > 254) return
    setInputEntry(e.target.value)
    setTextLength(254 - e.target.value.length)
  }

  return (
    <div className={classes.container}>
      <FontAwesomeIcon
        icon={faEdit}
        className={classes.editIcon}
        onClick={() => {
          setShowEdit(!showEdit)
          setMoodId(userStats.mood)
          setInputEntry(userStats.journal)
        }}
      />
        <li>
          {!showEdit &&
            <FontAwesomeIcon
              className={classes.moodIcon}
              icon={entryIcons[userStats.mood - 1]}
              color={entryColors[userStats.mood - 1]}
            />
          }
          {showEdit &&
            <UpdateIcon
              moodId={moodId}
              setMoodId={setMoodId}
            />
          }
        </li>

        <li><h2>Journal Entry:</h2>
          {!showEdit &&
            <p>{userStats.journal}</p>
          }

          {showEdit &&
            <FormTextField
              handleChange={handleChange}
              inputEntry={inputEntry}
              textLength={textLength}
              classes={classes}
              handleEnter={handleEnter}
            />
          }
        </li>
      {showEdit &&
        <input
          type='button'
          value='Update'
          onClick={handleEnter}
        />
      }
    </div>
  )
}

export default EntryCard
