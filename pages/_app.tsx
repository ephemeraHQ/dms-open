import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { WagmiConfig, createClient } from "wagmi";
import { mainnet, goerli } from 'wagmi/chains';
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "XMTP x POAP",
    alchemyId,
    chains: [mainnet, goerli]
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>

        <Component {...pageProps} />

      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
