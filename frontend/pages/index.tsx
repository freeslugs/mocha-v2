import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Link,
  ListItem,
  Text,
  Flex,
  UnorderedList,
  Card,
  CardBody,
  Stack,
  CardFooter,
  ButtonGroup,
  useToast,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spacer,
  Modal,

  ModalOverlay,
  ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,FormControl,FormLabel,FormHelperText,ModalFooter,

    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    SimpleGrid
  


} from '@chakra-ui/react'
import { ethers, providers } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useState, useReducer } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from 'wagmi'
import { YourContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import YourContract from '../artifacts/contracts/YourContract.sol/YourContract.json'
import { Layout } from '../components/layout/Layout'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import { YourContract as YourContractType } from '../types/typechain'
import { use } from 'chai'

/**
 * Constants & Helpers
 */

const localProvider = new providers.StaticJsonRpcProvider(
  'http://localhost:8545'
)

const GOERLI_CONTRACT_ADDRESS = '0x3B73833638556f10ceB1b49A18a27154e3828303'

/**
 * Prop Types
 */
type StateType = {
  greeting: string
  inputValue: string
}
type ActionType =
  | {
      type: 'SET_GREETING'
      greeting: StateType['greeting']
    }
  | {
      type: 'SET_INPUT_VALUE'
      inputValue: StateType['inputValue']
    }

/**
 * Component
 */
const initialState: StateType = {
  greeting: '',
  inputValue: '',
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    // Track the greeting from the blockchain
    case 'SET_GREETING':
      return {
        ...state,
        greeting: action.greeting,
      }
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.inputValue,
      }
    default:
      throw new Error()
  }
}

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { isLocalChain } = useCheckLocalChain()

  const { isMounted } = useIsMounted()

  const CONTRACT_ADDRESS = isLocalChain
    ? LOCAL_CONTRACT_ADDRESS
    : GOERLI_CONTRACT_ADDRESS

  const { address } = useAccount()

  const provider = useProvider()

  const toast = useToast()

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: YourContract.abi,
    functionName: 'setGreeting',
    args: [state.inputValue],
    enabled: Boolean(state.inputValue),
  })

  const { data, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log('success data', data)
      toast({
        title: 'Transaction Successful',
        description: (
          <>
            <Text>Successfully updated the Greeting!</Text>
            <Text>
              <Link
                href={`https://goerli.etherscan.io/tx/${data?.blockHash}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Text>
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
  })

  // call the smart contract, read the current greeting value
  async function fetchContractGreeting() {
    if (provider) {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        YourContract.abi,
        provider
      ) as YourContractType
      try {
        const data = await contract.greeting()
        dispatch({ type: 'SET_GREETING', greeting: data })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Error: ', err)
      }
    }
  }

  // State to hold charities data
  const [charities, setCharities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharity, setSelectedCharity] = useState(null)
  

  // Fetch charities data from API
  useEffect(() => {
    if(charities.length == 0) {
      fetch('/api/charities')
        .then(response => response.json())
        .then(data => setCharities(data.data));
    }
  }, []);

  

  // State to hold donation amount in ETH
  const [donationAmount, setDonationAmount] = useState('');
  const [activeCharity, setActiveCharity ] = useState(false);
  const [ethToUsd, setEthToUsd] = useState(0);

  // Fetch ETH to USD conversion rate
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then(response => response.json())
      .then(data => setEthToUsd(data.ethereum.usd));
  }, []);

  if (!isMounted) {
    return null
  }
  
  return (
    <Layout>
      <Heading as="h2" mb="8">
        Help us <Text as="span" color='green'> save</Text> the world
      </Heading>
      <Text fontSize="lg" mb="4">
        Mocha is a non-profit organization dedicated to fostering a culture of giving. 
        We believe in the power of collective action to help those in need. 
        Our mission is to provide a platform for individuals and organizations 
        to make a difference in their communities. Join us in our journey to make 
        the world a better place.
      </Text>
      <Spacer height="20px" />

       <Input 
         placeholder="Search charities..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
       />
       <Spacer height="20px" />
       <TableContainer>
         <Table size='sm'>
           <Thead>
             <Tr>
               {/* <Th>id</Th> */}
               <Th>Name</Th>
               <Th>Description</Th>
               <Th>Website</Th>
               <Th isNumeric>Grade</Th>
               <Th isNumeric>Donation Link</Th>
             </Tr>
           </Thead>
           <Tbody>
             {charities.filter((charity) => charity.title.toLowerCase().includes(searchTerm.toLowerCase())).map((charity, index) => (
               <Tr key={index}>

                  {/* <Td>{charity.id}</Td> */}
                  <Td>{charity.title.substring(0, 75)}</Td>
                  <Td>
                    {charity.stated_mission.substring(0, 50)}<br/>
                    {charity.stated_mission.substring(50, 100)}
                  </Td>
                  
                  
                  {/* <Td>{charity.contact_info}</Td> */}
                  {/* <Td>{charity.other_names}</Td> */}
                  <Td>{charity.website}</Td>
                  {/* <Td>{charity.tax_status}</Td> */}
                  
                  <Td>{charity.grade}</Td>
                  {/* <Td>{charity.program_percentage}</Td> */}
                  {/* <Td>{charity.cost_to_raise}</Td> */}
                  
                  {/* <Td>{charity.url}</Td> */}
                 <Td isNumeric>
                   <Button onClick={() => setActiveCharity(charity)}>
                     Donate
                   </Button>
                 </Td>
               </Tr>
             ))}
           </Tbody>
         </Table>
       </TableContainer>
       <Modal isOpen={activeCharity} onClose={() => setActiveCharity(null)}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Donate to {activeCharity?.title}</ModalHeader>
           <ModalCloseButton />
           <ModalBody>
             <FormControl>
             <Text><Text as='b'>Our mission is </Text>{activeCharity?.stated_mission}</Text>
             <Spacer height="10px" />
             <Text><Text as='b'>Tax Status:</Text> is ${activeCharity?.tax_status}</Text>
             <Spacer height="10px" />
             <Text> <Text as='b'>Address:</Text>  {activeCharity?.contact_info}</Text>
             <Spacer height="10px" />
             <Text><Text as='b'>Visit us here:</Text> <Link color={'blue'} href={activeCharity?.website}>{activeCharity?.website}</Link></Text>
             <Spacer height="10px" />
             {/* {<Text><Text as='b'>We are also known as:</Text> {activeCharity.other_names}</Text> */}
             <Spacer height="10px" />
            <SimpleGrid columns={3} spacing={10}>

              <Box height='80px'>

                  <Stat>
                    <StatLabel>Grade</StatLabel>
                    <StatNumber>{activeCharity?.grade}</StatNumber>
                    <StatHelpText></StatHelpText>
                  </Stat>
                </Box>
              
              <Box height='80px'>

              
                  <Stat>
                    <StatLabel>Program Percentage</StatLabel>
                    <StatNumber>{activeCharity?.program_percentage}%</StatNumber>
                    <StatHelpText></StatHelpText>
                  </Stat>
                </Box>

              <Box height='80px'>

                  <Stat>
                    <StatLabel>Cost to Raise $100</StatLabel>
                    <StatNumber>${activeCharity?.cost_to_raise}</StatNumber>
                    <StatHelpText></StatHelpText>
                  </Stat>
                </Box>

                
              </SimpleGrid>
              
             
              
              <Text>{activeCharity?.website}</Text>
              <Text>{activeCharity?.tax_status}</Text>
              
              <Text>{activeCharity?.grade}</Text>
              <Text>{activeCharity?.program_percentage}</Text>
              <Text>${activeCharity?.cost_to_raise}.00</Text>
              
              <Text>{activeCharity?.url}</Text>

              <FormLabel>Donation Amount in ETH</FormLabel>
               <Input 
                 placeholder="Enter amount in ETH..."
                 value={donationAmount}
                 onChange={(e) => setDonationAmount(e.target.value)}
               />
               <FormHelperText>${(donationAmount * ethToUsd).toFixed(2)}</FormHelperText>
             
             
              </FormControl>
           </ModalBody>
           <ModalFooter>
             <Button colorScheme="blue" onClick={() => console.log('Submit donation')}>
               Submit
             </Button>
           </ModalFooter>
         </ModalContent>
       </Modal>
    </Layout>
  )
}

export default Home
