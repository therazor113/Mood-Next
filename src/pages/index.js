import Layout from 'components/core/Layout'
import MoodChart from 'components/pageRefs/MoodChart'
import Testing from 'components/pageRefs/Testing'

export default function Home () {
  return (
    <Layout>
      <Testing />
      <MoodChart />
    </Layout>
  )
}
