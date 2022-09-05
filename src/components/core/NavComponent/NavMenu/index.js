import { useState } from 'react'
import NavLinks from '../NavLinks'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss'

const NavMenu = ({ loggedIn }) => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className={classes.container}>
      <FontAwesomeIcon
        className={classes.menuButton}
        icon={openMenu ? faTimes : faBars}
        onClick={() => setOpenMenu(!openMenu)}
        style={openMenu ? { transform: 'scale(1.3)', color: 'rgba(235, 235, 235, 0.75)' } : {}}
      />
      <div
        className={classes.menuContainer}
        style={openMenu ? { transform: 'scaleY(1)', opacity: '1' } : {}}
      >
        <NavLinks loggedIn={loggedIn} classes={classes}/>
      </div>
    </div>
  )
}

export default NavMenu
