const FormValidation = (inputValue, setValid, setMessage, messageTimer) => {
  if (!inputValue.name && !inputValue.password) {
    setValid({ name: false, password: false, retype: false })
    setMessage('Name and password required')
    messageTimer()
    return false
  } else if (!inputValue.name) {
    setValid({ name: false, password: true, retype: true })
    setMessage('Name required')
    messageTimer()
    return false
  } else if (!inputValue.password) {
    setValid({ name: true, password: false, retype: false })
    setMessage('Password required')
    messageTimer()
    return false
  } else if (inputValue.retype === undefined) {
    setValid({ name: true, password: true, retype: true })
    return true
  } else if (inputValue.password !== inputValue.retype) {
    setValid({ name: true, password: false, retype: false })
    setMessage('Passwords must match')
    messageTimer()
    return false
  }
  return true
}

export default FormValidation
