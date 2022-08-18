import CreateUserForm from './CreateUserForm'
import Link from 'next/link'

import classes from './styles.module.scss'

const LoginCard = () => {
  return (
      <div className={classes.container}>
        <div className={classes.header}>
          <h1>Create Login</h1>
          <h2>Enter a Name and Password<br/>to create an account.</h2>
        </div>
        <CreateUserForm />
        <div className={classes.footer}>
          <p>Already A Member?</p>
          <Link href='/'>
            <span className={classes.link}>Sign In</span>
          </Link>
        </div>
      </div>
  )
}

export default LoginCard
