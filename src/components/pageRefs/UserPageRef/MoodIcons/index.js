import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaughBeam, faGrinBeam, faSmileBeam, faSmile, faFaceMeh, faFaceFrownOpen, faFaceFrown, faFaceSadCry, faFaceDizzy } from '@fortawesome/free-solid-svg-icons'

import classes from './styles.module.scss'

const MoodIcons = ({ setCurrentMood }) => {
  return (
    <div className={classes.container}>
      <FontAwesomeIcon
        icon={faLaughBeam}
        color={'rgba(0, 200, 0, 1)'}
        onClick={() => setCurrentMood(9)}
      />
      <FontAwesomeIcon
        icon={faGrinBeam}
        color={'rgba(55, 225, 0, 0.8)'}
        onClick={() => setCurrentMood(8)}
      />
      <FontAwesomeIcon
        icon={faSmileBeam}
        color={'rgba(120, 200, 0, 0.9)'}
        onClick={() => setCurrentMood(7)}
      />
      <FontAwesomeIcon
        icon={faSmile}
        color={'rgba(200, 225, 0, 0.9)'}
        onClick={() => setCurrentMood(6)}
      />
      <FontAwesomeIcon
        icon={faFaceMeh}
        color={'rgba(255, 255, 0, 0.9)'}
        onClick={() => setCurrentMood(5)}
      />
      <FontAwesomeIcon
        icon={faFaceFrownOpen}
        color={'rgba(255, 204, 0, 0.9)'}
        onClick={() => setCurrentMood(4)}
      />
      <FontAwesomeIcon
        icon={faFaceFrown}
        color={'rgba(255, 119, 0, 0.9)'}
        onClick={() => setCurrentMood(3)}
      />
      <FontAwesomeIcon
        icon={faFaceSadCry}
        color={'rgba(255, 68, 0, 0.9)'}
        onClick={() => setCurrentMood(2)}
      />
      <FontAwesomeIcon
        icon={faFaceDizzy}
        color={'rgba(255, 0, 0, 0.9)'}
        onClick={() => setCurrentMood(1)}
      />
    </div>
  )
}

export default MoodIcons
