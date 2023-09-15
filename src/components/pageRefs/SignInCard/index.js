import SignInForm from './SignInForm'
import Link from 'next/link'

import classes from './styles.module.scss'

const SignInCard = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>User Login</h1>
        <h2>Enter your name and password<br/>to view your charts!</h2>
      </div>
      <SignInForm />
      <div className={classes.footer}>
        <p>Don&apos;t have an account?</p>
        <Link href='/createLogin'>
          <span className={classes.link}>Create Account</span>
        </Link>
      </div>
    </div>
  )
}

export default SignInCard
