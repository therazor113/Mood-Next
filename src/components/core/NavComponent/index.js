import { useRouter } from 'next/router'
import Link from 'next/link'

import classes from './styles.module.scss'

const NavComponent = ({ log }) => {
  const router = useRouter()
  const handleClick = async () => {
    await fetch('/api/CookieApi')
    router.push('/')
  }

  return (
    <div className={classes.container}>
      <Link href='/'>
        <h2>Mood-<span className={classes.next}>Next</span></h2>
      </Link>
      <div>
        {log === 'in' &&
        <Link href='/createLogin'>
          <h2 className={classes.link}>Register</h2>
          </Link>
          }
          <h2 className={classes.link} onClick={handleClick}>Log {log}</h2>
      </div>
    </div>
  )
}

export default NavComponent
