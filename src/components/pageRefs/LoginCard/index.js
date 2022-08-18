import SignInForm from './SignInForm'
import Link from 'next/link'

import classes from './styles.module.scss'

const LoginCard = () => {
  return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>User Login</h1>
          <h2>Welcome! Enter your name to sign in<br/>and view your charts!</h2>
        </div>
        <SignInForm />
        <div className={classes.footer}>
          <p>Don&apos;t have an account?</p>
          <Link href='/createUser'>
            <span className={classes.link}>Create Account</span>
          </Link>
        </div>
      </div>
  )
}

export default LoginCard
