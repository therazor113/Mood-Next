import Providers from 'contexts/Providers'

import 'chart.js/auto'
import 'styles/globals.scss'
import 'lib/prototypes/getWeek'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

const MyApp = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
