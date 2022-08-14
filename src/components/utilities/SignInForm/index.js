import { useState } from 'react'
import { useRouter } from 'next/router'

import classes from './styles.module.scss'

const SignInForm = () => {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const handleEnter = async () => {
    if (!inputValue) return
    try {
      const res = await fetch(`/api/UsersApi/GetUsers/${inputValue}`)
      const data = await res.json()
      router.push('/[name]', `/${data.name}`)
    } catch (err) {
      console.error(err.message)
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
      <button onClick={handleEnter}>Login</button>
      <input value={inputValue} onChange={handleChange} onKeyUp={handleKeyUp} autoFocus/>
    </main>
  )
}

export default SignInForm
