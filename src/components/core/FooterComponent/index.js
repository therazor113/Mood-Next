import Image from 'next/image'
import classes from './styles.module.scss'

const FooterComponent = () => {
  return (
    <footer className={classes.footer}>
      Powered by{' '}
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </a>
  </footer>
  )
}

export default FooterComponent
