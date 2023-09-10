require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()
require("./tasks/block-number")
require("./tasks/docgen")
require("hardhat-gas-reporter")
require("solidity-coverage")
require('@primitivefi/hardhat-dodoc');

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL + process.env.INFURA_API_KEY || "https://nowhere"
const OPTIMISM_GOERLI_RPC_URL = process.env.OPTIMISM_GOERLI_RPC_URL + process.env.INFURA_API_KEY || "https://nowhere"

const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL + process.env.INFURA_API_KEY || "https://nowhere"
const SCROLL_SEPOLIA_RPC_URL = process.env.SCROLL_SEPOLIA_RPC_URL || "https://nowhere"
const ARBITRUM_GOERLI_RPC_URL = process.env.ARBITRUM_GOERLI_RPC_URL + process.env.INFURA_API_KEY || "https://nowhere"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xnokey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "nokey"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "nokey"
//const PUBLIC_KEY = process.env.PUBLIC_KEY || "0xnopublickey"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: MAINNET_RPC_URL,
        blockNumber: 16071661
      }
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      chainId: 1,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 1337,
    },
    
    arbitrumgoerli: {
      url: ARBITRUM_GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 421613,
    },
    optimismgoerli: {
      url: OPTIMISM_GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 420,
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
    
    scrollsepolia: {
      urls: {
        apiURL: SCROLL_SEPOLIA_RPC_URL,
        browserURL: "https://sepolia.scrollscan.dev"
      },
      accounts: [PRIVATE_KEY],
      chainId: 534351,
      url: SCROLL_SEPOLIA_RPC_URL
    },
    
    arbitrum: {
      url: ARBITRUM_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 42161,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.8",
        settings: {
          optimizer: {
            runs: 200,
            enabled: true
          }
        }
      },
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            runs: 200,
            enabled: true
          }
        }
      }
    ],
  },
  etherscan: {
    apiKey: {
      scrollSepolia: 'abc',
      mainnet: ETHERSCAN_API_KEY
    },
    customChains: [
      {
        network: 'scrollSepolia',
        chainId: 534351,
        urls: {
          apiURL: 'https://sepolia-blockscout.scroll.io/api',
          browserURL: 'https://sepolia-blockscout.scroll.io/',
        },
      },
    ],
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH"
  },
  dodoc: {
    runOnCompile: true, // https://www.npmjs.com/package/@primitivefi/hardhat-dodoc
    //doesnt do private and internal
  },
};