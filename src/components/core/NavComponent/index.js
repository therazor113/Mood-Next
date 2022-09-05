import Link from 'next/link'
import NavMenu from './NavMenu'
import NavLinks from './NavLinks'

import classes from './styles.module.scss'

const NavComponent = ({ loggedIn }) => {
  return (
    <div className={classes.container}>
      <Link href='/'>
        <h2>Mood-<span className={classes.next}>Next</span></h2>
      </Link>
      <NavLinks loggedIn={loggedIn} classes={classes}/>
      <NavMenu loggedIn={loggedIn} />
    </div>
  )
}

export default NavComponent
