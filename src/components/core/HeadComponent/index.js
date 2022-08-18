import { useContext } from 'react'
import Head from 'next/head'
import FaviconContext from 'contexts/FaviconContext'

const HeadComponent = ({ title }) => {
  const { favicon } = useContext(FaviconContext)
  return (
    <Head>
      <title>{`Mood-Next | ${title}`}</title>
      <meta name="description" content="Mood tracking web application" />
      <link rel="icon" href={favicon} />
    </Head>
  )
}

export default HeadComponent
