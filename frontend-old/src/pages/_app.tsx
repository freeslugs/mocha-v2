import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { arbitrum, mainnet, polygon, optimism, goerli, fantom } from "wagmi/chains"
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public'

import '@rainbow-me/rainbowkit/styles.css';
import { config } from '../utils/config'

import {
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme, darkTheme, midnightTheme
} from '@rainbow-me/rainbowkit';

import {
  injectedWallet,
  ledgerWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  metaMaskWallet,
} from '@rainbow-me/rainbowkit/wallets';

const { chains, provider } = configureChains(
  [
    mainnet, polygon, arbitrum, optimism, goerli
  ],
  [
    infuraProvider({apiKey: process.env.INFURA, priority: 0}),
    alchemyProvider({apiKey: process.env.ALCHEMY, priority: 1}),
    publicProvider({priority: 2})
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      ledgerWallet({ chains }),
      coinbaseWallet({ chains, appName: config.name }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      rainbowWallet({ chains }),
      injectedWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  }
]);

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
})

import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  
  return (
    <>
      <ChakraProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider coolMode  chains={chains} modalSize="compact" > 
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  )
}

export default MyApp
//theme={isDark ? lightTheme() : darkTheme()}