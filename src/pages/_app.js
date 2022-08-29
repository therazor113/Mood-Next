import Providers from 'contexts/Providers'
import NextNProgress from 'nextjs-progressbar'

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
      <NextNProgress
        color="#29D"
        startPosition={0.2}
        stopDelayMs={100}
        height={1}
        showOnShallow={false}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
