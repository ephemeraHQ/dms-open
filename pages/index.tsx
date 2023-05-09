import Head from 'next/head'
import DMsOpen from './DMsOpen'

const Home = () => {
  return (
    <div>
        <Head>
            <title>XMTP | DMs Open</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <DMsOpen />
    </div>
  )
}

export default Home
