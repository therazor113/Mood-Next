import { useState } from 'react'

const Testing = () => {
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')

  const handleEnter = async () => {
    if (!inputValue) return
    try {
      const createRes = await fetch('/api/UsersApi/CreateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: inputValue })
      })
      const data = await createRes.json()
      setMessage(data)
      setTimeout(() => setMessage(''), 1500)
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
    <main>
      <button onClick={handleEnter}>Testing</button>
      <input value={inputValue} onChange={handleChange} onKeyUp={handleKeyUp} autoFocus/>
      <p>{message}</p>
    </main>
  )
}

export default Testing
