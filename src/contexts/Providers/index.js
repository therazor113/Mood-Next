import { FaviconProvider } from 'contexts/FaviconContext'

const Providers = ({ children }) => {
  return (
    <FaviconProvider>
      {children}
    </FaviconProvider>
  )
}

export default Providers
