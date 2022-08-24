import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import FaviconContext from 'contexts/FaviconContext'
import NameField from 'components/utilities/formFields/NameField'
import PasswordField from 'components/utilities/formFields/PasswordField'
import FormValidation from 'components/utilities/FormValidation'
import FetchSignIn from './FetchSignIn'
import useAPI from 'hooks/useAPI'
import Link from 'next/link'

import classes from './styles.module.scss'

const SignInForm = () => {
  const [inputValue, setInputValue] = useState({ name: '', password: '', keepToken: false })
  const [valid, setValid] = useState({ name: true, password: true })
  const messageTimer = () => setTimeout(() => setMessage(''), 2000)
  const [keepToken, setKeepToken] = useState(false)
  const { setFavicon } = useContext(FaviconContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [handleFetch] = useAPI()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const inputValidity = FormValidation(inputValue, setValid, setMessage, messageTimer)
    if (!inputValidity) {
      setFavicon('/error.ico')
      return
    }

    setLoading(true)
    const data = await FetchSignIn(handleFetch, inputValue, keepToken)

    if (!data) {
      setValid({ name: false, password: false })
      setLoading(false)
      setMessage('Name or password is incorrect')
      messageTimer()
    } else {
      setFavicon('/login.ico')
      setValid({ name: true, password: true })
      router.push('/[name]', `/${data.name}`)
    }
  }

  const handleChange = (e) => {
    if (e.target.name === 'name' && e.target.value.length > 25) return
    if (/password|retype/.test(e.target.name) && e.target.value.length > 45) return
    setInputValue({ ...inputValue, [e.target.name]: e.target.value })
    setValid({ name: true, password: true })
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={classes.formContainer}>
          <NameField
            classes={classes}
            inputValue={inputValue}
            handleChange={handleChange}
            valid={valid}
          />
          <PasswordField
            classes={classes}
            inputValue={inputValue}
            handleChange={handleChange}
            valid={valid}
          />
          <div className={classes.formLinks}>
            <label>
                <input
                  type='checkbox'
                  className={classes.checkbox}
                  onChange={() => setKeepToken(!keepToken)}
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
