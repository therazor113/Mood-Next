import { useState } from 'react'
import { useRouter } from 'next/router'
import useAPI from 'hooks/useAPI'
import UserSignIn from './UserSignIn'

import classes from './styles.module.scss'

const SignInForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')
  const [handleFetch] = useAPI()
  const router = useRouter()

  const handleEnter = async () => {
    if (!inputValue) return
    const data = await UserSignIn(handleFetch, inputValue)
    if (!data) {
      setMessage('User does not exist')
      setTimeout(() => setMessage(''), 1500)
    } else {
      router.push('/[name]', `/${data.name}`)
    }
  }

  const handleChange = (e) => {
    if (!/^[a-zA-Z]*$/g.test(e.target.value) || e.target.value.length > 10) return
    setInputValue(e.target.value)
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleEnter()
    }
  }

  return (
    <main className={classes.container}>
      <p className={classes.message}>{message}</p>
      <button onClick={handleEnter}>Login</button>
      <input value={inputValue} onChange={handleChange} onKeyUp={handleKeyUp} autoFocus/>
    </main>
  )
}

export default SignInForm
