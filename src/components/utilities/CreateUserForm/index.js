import { useState } from 'react'
import CreateUser from './CreateUser'
import useAPI from 'hooks/useAPI'

import classes from './styles.module.scss'

const CreateUserForm = () => {
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')
  const [handleFetch] = useAPI()

  const handleEnter = async () => {
    if (!inputValue) return
    const data = await CreateUser(handleFetch, inputValue)
    setMessage(data)
    setTimeout(() => setMessage(''), 1500)
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
      <button onClick={handleEnter}>Create</button>
      <input value={inputValue} onChange={handleChange} onKeyUp={handleKeyUp} autoFocus/>
    </main>
  )
}

export default CreateUserForm
