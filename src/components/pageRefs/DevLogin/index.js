import { useRouter } from 'next/router'
import FetchSignIn from '../SignInCard/SignInForm/FetchSignIn'
import useAPI from 'hooks/useAPI'

import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './styles.module.scss'

const DevLogin = () => {
  const [handleFetch] = useAPI()
  const router = useRouter()
  const handleClick = async (e) => {
    const inputValue = { name: e.target.name, password: 'dev' }
    const data = await FetchSignIn(handleFetch, inputValue)
    if (data) {
      router.push('/[name]', `/${data.name}`)
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Dev Login</h1>
        <h2>Test out the app in dev mode!</h2>
      </div>
      <div className={classes.users}>
        <div className={classes.buttonDiv}>
          <FontAwesomeIcon
            icon={faUserCog}
            className={classes.leftInputIcon}
          />
          <input
            type='button'
            name='John'
            aria-label='John'
            value='John - Consistent'
            onClick={handleClick}
          />
        </div>
        <div className={classes.buttonDiv}>
          <FontAwesomeIcon
            icon={faUserCog}
            className={classes.leftInputIcon}
          />
          <input
            type='button'
            name='Smith'
            aria-label='Smith'
            value='Smith - Inconsistent'
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default DevLogin
