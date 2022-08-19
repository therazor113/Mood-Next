import Providers from 'contexts/Providers'

import 'chart.js/auto'
import 'styles/globals.scss'
import 'lib/prototypes/getWeek'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { defaults } from 'chart.js'
// Disabled autoAddCss since its imported above
config.autoAddCss = false
// Added FontAwesome for icon use in charts
defaults.font.family = "'Helvetica Neue', 'Helvetica', 'Arial', 'Font Awesome 6 Free', sans-serif"

const MyApp = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
