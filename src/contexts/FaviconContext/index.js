import { useState, createContext } from 'react'

const FaviconContext = createContext()

export const FaviconProvider = ({ children }) => {
  const [favicon, setFavicon] = useState('')

  return (
    <FaviconContext.Provider value={{ favicon, setFavicon }}>
      {children}
    </FaviconContext.Provider>
  )
}

export default FaviconContext
