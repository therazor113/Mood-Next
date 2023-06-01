import { FaviconProvider } from 'contexts/FaviconContext'
import { DevProvider } from 'contexts/DevContext'

const Providers = ({ children }) => {
  return (
    <FaviconProvider>
      <DevProvider>
      {children}
      </DevProvider>
    </FaviconProvider>
  )
}

export default Providers
