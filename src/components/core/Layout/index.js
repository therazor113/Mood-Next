import HeadComponent from '../HeadComponent'
import FooterComponent from '../FooterComponent'

import classes from './styles.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={classes.container}>
      <HeadComponent />
      <main className={classes.main}>
        {children}
      </main>
      <FooterComponent />
    </div>
  )
}

export default Layout
