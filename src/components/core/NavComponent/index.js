import Link from 'next/link'

import classes from './styles.module.scss'

const NavComponent = ({ log }) => {
  return (
    <div className={classes.container}>
      <h2>Mood-<span className={classes.next}>Next</span></h2>
      <div>
        <Link href={'/createLogin'}>
          <h2 className={classes.link}>Register</h2>
          </Link>
        <Link href={'/'}>
          <h2 className={classes.link}>Log {log}</h2>
        </Link>
      </div>
    </div>
  )
}

export default NavComponent
