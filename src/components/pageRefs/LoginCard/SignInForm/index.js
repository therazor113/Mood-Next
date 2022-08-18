import { useState } from 'react'
import { useRouter } from 'next/router'
import FetchSignIn from './FetchSignIn'
import useAPI from 'hooks/useAPI'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLock, faUnlock, faLockOpen, faUser } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss'

const SignInForm = () => {
  const [inputValue, setInputValue] = useState({ name: '', password: '', retype: '' })
  const [leftIcon, setLeftIcon] = useState(false)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [handleFetch] = useAPI()
  const router = useRouter()
  const loading = null

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await FetchSignIn(handleFetch, inputValue)
    if (!data) {
      setMessage('User does not exist, please try again or create an account')
      setTimeout(() => setMessage(''), 1500)
    } else {
      router.push('/[name]', `/${data.name}`)
    }
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
              className={classes.leftPassIcon}
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
              icon={show ? faLockOpen : leftIcon ? faUnlock : faLock}
              className={classes.leftPassIcon}
            />
            <span className={classes.inputCursor} />
            <input
              required
              type={show ? 'text' : 'password'}
              name='password'
              aria-label='Password'
              placeholder='Password'
              value={inputValue.password}
              onChange={handleChange}
              onFocus={() => setLeftIcon(true)}
              onBlur={() => setLeftIcon(false)}
            />
            <FontAwesomeIcon
              icon={show ? faEye : faEyeSlash}
              className={classes.rightPassIcon}
              onMouseDown={() => setShow(!show)}
            />
          </div>
          <div className={classes.formLinks}>
            <label>
                <input
                  type='checkbox'
                  className={classes.checkbox}
                  disabled={loading}
                />
                Keep me logged in
              </label>
              <Link href='/'>
                <p>Forgot password?</p>
              </Link>
            </div>
          <input
            type='submit'
            value={loading ? 'Signing in...' : 'Sign In'}
            className={classes.submit}
            disabled={loading}
          />
        </div>
      </form>
      <p className={classes.message}>{message}</p>
    </div>
  )
}

export default SignInForm
