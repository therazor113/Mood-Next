import HeadComponent from '../HeadComponent'
import FooterComponent from '../FooterComponent'

import classes from './styles.module.scss'

const Layout = ({ children, title }) => {
  return (
    <div className={classes.container}>
      <HeadComponent title={title}/>
      <main className={classes.main}>
        {children}
      </main>
      <FooterComponent />
    </div>
  )
}

export default Layout
