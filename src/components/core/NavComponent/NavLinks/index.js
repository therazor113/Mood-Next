import { useRouter } from 'next/router'
import Link from 'next/link'

const NavLinks = ({ loggedIn, classes }) => {
  const router = useRouter()
  const handleClick = async () => {
    if (loggedIn) await fetch('/api/CookieApi')
    router.push('/')
  }
  return (
    <div className={classes.links}>
    {!loggedIn &&
      <Link href='/createLogin'>
        <h2 className={classes.link}>Register</h2>
      </Link>
    }
    <h2
      className={classes.link}
      onClick={handleClick}
    >{loggedIn ? 'Log out' : 'Log in'}</h2>
  </div>
  )
}

export default NavLinks
