import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLock, faUnlock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const PasswordField = ({ classes, inputValue, handleChange, valid }) => {
  const [leftIcon, setLeftIcon] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div style={{ width: '100%' }}>
    <FontAwesomeIcon
      icon={showPassword ? faLockOpen : leftIcon ? faUnlock : faLock}
      className={classes.leftInputIcon}
    />
    <span className={classes.inputCursor} />
    <input
      type={showPassword ? 'text' : 'password'}
      name='password'
      aria-label='Password'
      placeholder='Password'
      value={inputValue.password}
      onChange={handleChange}
      onFocus={() => setLeftIcon(true)}
      onBlur={() => setLeftIcon(false)}
      style={!valid.password ? { border: '2px solid red' } : {}}
    />
    <FontAwesomeIcon
      icon={showPassword ? faEye : faEyeSlash}
      className={classes.rightInputIcon}
      onMouseDown={() => setShowPassword(!showPassword)}
      style={showPassword && { color: 'rgb(60, 170, 125)' }}
    />
  </div>
  )
}

export default PasswordField
