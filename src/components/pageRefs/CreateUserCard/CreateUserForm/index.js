import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import FaviconContext from 'contexts/FaviconContext'
import NameField from 'components/utilities/formFields/NameField'
import PasswordField from 'components/utilities/formFields/PasswordField'
import RetypeField from 'components/utilities/formFields/RetypeField'
import FetchSignIn from 'components/pageRefs/SignInCard/SignInForm/FetchSignIn'
import FormValidation from 'components/utilities/FormValidation'
import CreateUser from './CreateUser'
import useAPI from 'hooks/useAPI'

import classes from './styles.module.scss'

const CreateUserForm = () => {
  const [inputValue, setInputValue] = useState({ name: '', password: '', retype: '' })
  const [valid, setValid] = useState({ name: true, password: true, retype: true })
  const messageTimer = () => setTimeout(() => setMessage(''), 2000)
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
    const data = await CreateUser(handleFetch, inputValue)

    if (!data) {
      setLoading(false)
      setMessage('Please use a different name')
      setValid({ name: false, password: true, retype: true })
    } else {
      setMessage(data)
      setValid({ name: true, password: true, retype: true })
      setFavicon('/create.ico')
      const userData = await FetchSignIn(handleFetch, inputValue)
      router.push('/[name]', `/${userData.name}`)
    }
    messageTimer()
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
          <RetypeField
            classes={classes}
            inputValue={inputValue}
            handleChange={handleChange}
            valid={valid}
          />
          <input
            type='submit'
            value={loading ? 'Signing in...' : 'Create Account'}
            className={loading ? classes.disabled : classes.submit}
            disabled={loading}
          />
        </div>
      </form>
      <p className={classes.message}>{message}</p>
    </div>
  )
}

export default CreateUserForm
