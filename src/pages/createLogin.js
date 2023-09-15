import { useContext, useEffect, useState } from 'react'
import FaviconContext from 'contexts/FaviconContext'
import Layout from 'components/core/Layout'
import CreateUserCard from 'components/pageRefs/CreateUserCard'
import DevLogin from 'components/pageRefs/DevLogin'

import classes from 'styles/styles.module.scss'

const CreateUserPage = () => {
  const [testDrive, setTestDrive] = useState(false)
  const { setFavicon } = useContext(FaviconContext)

  useEffect(() => {
    setFavicon('/create.ico')
  }, [setFavicon])

  return (
    <Layout title={'Create Login'} loggedIn={false}>
      {(!testDrive && <CreateUserCard />) || <DevLogin />}
        <h2>-</h2>
        <button
          className={classes.devButton}
          onClick={() => setTestDrive(!testDrive)}>
          {!testDrive ? 'Test drive?' : 'Create login?'}
        </button>
    </Layout>
  )
}

export default CreateUserPage
