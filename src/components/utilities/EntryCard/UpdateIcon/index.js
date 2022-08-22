import { entryColors, entryIcons } from 'components/pageRefs/EntriesList/EntryVariables'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss'

const UpdateIcon = ({ moodId, setMoodId }) => {
  return (
    <div className={classes.container}>
      <FontAwesomeIcon
        icon={faAngleLeft}
        className={classes.arrowIcon}
        onClick={() => setMoodId(prev => prev <= 1 ? 1 : prev - 1)}
      />
      <FontAwesomeIcon
        icon={entryIcons[moodId - 1]}
        className={classes.moodIcon}
        color={entryColors[moodId - 1]}
      />
      <FontAwesomeIcon
        icon={faAngleRight}
        className={classes.arrowIcon}
        onClick={() => setMoodId(prev => prev >= 9 ? 9 : prev + 1)}
      />
    </div>
  )
}

export default UpdateIcon
