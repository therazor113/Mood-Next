import Image from 'next/image'
import classes from './styles.module.scss'

const FooterComponent = () => {
  return (
    <main>
        <footer className={classes.footer}>
          Powered by{' '}
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
          <span className={classes.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </main>
  )
}

export default FooterComponent
