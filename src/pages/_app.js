/* eslint-disable no-unused-vars */
import 'chart.js/auto'
import 'styles/globals.scss'
import 'lib/prototypes/getWeek'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

function MyApp ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
