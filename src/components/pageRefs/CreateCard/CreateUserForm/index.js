import { useState } from 'react'
import CreateUser from './CreateUser'
import useAPI from 'hooks/useAPI'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLock, faUnlock, faLockOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss'

const CreateUserForm = () => {
  const [inputValue, setInputValue] = useState({ name: '', password: '', retype: '' })
  const [leftIcon, setLeftIcon] = useState({ passInput: false, retypeInput: false })
  const [show, setShow] = useState({ passInput: false, retypeInput: false })
  const [message, setMessage] = useState('')
  const [handleFetch] = useAPI()
  const loading = null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputValue.password !== inputValue.retype) {
      setMessage('Passwords must match')
      setTimeout(() => setMessage(''), 1500)
      return
    }
    if (!inputValue) return
    const data = await CreateUser(handleFetch, inputValue)
    setMessage(data)
    setTimeout(() => setMessage(''), 1500)
  }

  const handleChange = (e) => {
    if (e.target.name === 'name' && e.target.value.length > 25) return
    if (/password|retype/.test(e.target.name) && e.target.value.length > 45) return
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={classes.formContainer}>
          <div style={{ width: '100%' }}>
            <FontAwesomeIcon
              icon={faUser}
              className={classes.leftIcon}
            />
            <span className={classes.inputCursor} />
            <input
              required
              autoFocus
              type='text'
              name='name'
              aria-label='Name'
              placeholder='Name'
              value={inputValue.name}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: '100%' }}>
            <FontAwesomeIcon
              icon={show.passInput ? faLockOpen : leftIcon.passInput ? faUnlock : faLock}
              className={classes.leftIcon}
            />
            <span className={classes.inputCursor} />
            <input
              required
              type={show.passInput ? 'text' : 'password'}
              name='password'
              aria-label='Password'
              placeholder='Password'
              value={inputValue.password}
              onChange={handleChange}
              onFocus={() => setLeftIcon({ ...leftIcon, passInput: true })}
              onBlur={() => setLeftIcon({ ...leftIcon, passInput: false })}
            />
            <FontAwesomeIcon
              icon={show.passInput ? faEye : faEyeSlash}
              className={classes.rightIcon}
              onMouseDown={() => setShow({ ...show, passInput: !show.passInput })}
            />
          </div>
          <div style={{ width: '100%' }}>
            <FontAwesomeIcon
              icon={show.retypeInput ? faLockOpen : leftIcon.retypeInput ? faUnlock : faLock}
              className={classes.leftIcon}
            />
            <span className={classes.inputCursor} />
            <input
              required
              type={show.retypeInput ? 'text' : 'password'}
              name='retype'
              aria-label='Retype Password'
              placeholder='Retype Password'
              value={inputValue.retype}
              onChange={handleChange}
              onFocus={() => setLeftIcon({ ...leftIcon, retypeInput: true })}
              onBlur={() => setLeftIcon({ ...leftIcon, retypeInput: false })}
            />
            <FontAwesomeIcon
              icon={show.retypeInput ? faEye : faEyeSlash}
              className={classes.rightIcon}
              onMouseDown={() => setShow({ ...show, retypeInput: !show.retypeInput })}
            />
          </div>
          <input
            type='submit'
            value={loading ? 'Signing in...' : 'Create Account'}
            className={classes.submit}
            disabled={loading}
          />
        </div>
      </form>
      <p className={classes.message}>{message}</p>
    </div>
  )
}

export default CreateUserForm
