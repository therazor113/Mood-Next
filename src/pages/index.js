import Layout from 'components/core/Layout'
import Testing from 'components/pageRefs/Testing'

import classes from 'styles/Home.module.scss'

export default function Home () {
  return (
    <Layout>
      <Testing />
        <h1 className={classes.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={classes.description}>
          Get started by editing{' '}
          <code className={classes.code}>pages/index.js</code>
        </p>

        <div className={classes.grid}>
          <a href="https://nextjs.org/docs" className={classes.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={classes.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={classes.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={classes.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
    </Layout>
  )
}
