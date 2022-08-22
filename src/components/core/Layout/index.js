import HeadComponent from '../HeadComponent'
import FooterComponent from '../FooterComponent'
import NavComponent from '../NavComponent'

import classes from './styles.module.scss'

const Layout = ({ children, title, log }) => {
  return (
    <div className={classes.container}>
      <HeadComponent title={title}/>
      <NavComponent log={log} />
      <main className={classes.main}>
        {children}
      </main>
      <FooterComponent />
    </div>
  )
}

export default Layout
