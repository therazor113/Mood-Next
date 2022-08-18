import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLock, faUnlock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const RetypeField = ({ classes, inputValue, handleChange, valid }) => {
  const [leftIcon, setLeftIcon] = useState(false)
  const [showRetype, setShowRetype] = useState(false)

  return (
    <div style={{ width: '100%' }}>
    <FontAwesomeIcon
      icon={showRetype ? faLockOpen : leftIcon ? faUnlock : faLock}
      className={classes.leftInputIcon}
    />
    <span className={classes.inputCursor} />
    <input
      type={showRetype ? 'text' : 'password'}
      name='retype'
      aria-label='Retype Password'
      placeholder='Retype Password'
      value={inputValue.retype}
      onChange={handleChange}
      onFocus={() => setLeftIcon(true)}
      onBlur={() => setLeftIcon(false)}
      style={!valid.retype ? { border: '2px solid red' } : {}}
    />
    <FontAwesomeIcon
      icon={showRetype ? faEye : faEyeSlash}
      className={classes.rightInputIcon}
      onMouseDown={() => setShowRetype(!showRetype)}
      style={showRetype && { color: 'rgb(60, 170, 125)' }}
    />
  </div>
  )
}

export default RetypeField
