import { useState, createContext } from 'react'

const DevContext = createContext()

export const DevProvider = ({ children }) => {
  const [dev, setDev] = useState(false)

  return (
    <DevContext.Provider value={{ dev, setDev }}>
      {children}
    </DevContext.Provider>
  )
}

export default DevContext
