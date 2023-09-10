import { Flex, Input, Text, useColorMode } from '@chakra-ui/react'
import { Connecting } from './Connecting'
import { ContractViewer } from './ContractViewer'
import { ContractWriter } from './ContractWriter'
import { contracts } from '../../utils/contracts'
import { useState } from 'react'


export const Core = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const [storeVal, setStoreVal] = useState(0)

  return (
    <Flex  
    height='100%'
    bgClip="text"
    justifyContent='left'  
    alignItems='top'
    flexDirection='column'
    >
      <Text color="text" fontSize="xs">Some Things You Can Do:</Text>
      <Connecting />
      <ContractViewer 
        addr={contracts.simpleStorage.address}
        abi={contracts.simpleStorage.abi}
        func="retrieve">
      </ContractViewer>
      <Flex  
        height='100%'
        bgClip="text"
        justifyContent='left'  
        alignItems='top'
        flexDirection='row'
      >
        <Input 
          mr='5px'
          borderRadius='10px'
          colorScheme={isDark ? "white" : "white"}
          placeholder="number to store here"
          size="sm"
          color={isDark ? "lightgreen" : "black"}
          height='40px'
          width='3xs'
          onChange={event => {
            setStoreVal(parseInt(event.currentTarget.value)
          )}}
          
        />
        <ContractWriter 
          borderRadius='10px'
          addr={contracts.simpleStorage.address}
          abi={contracts.simpleStorage.abi}
          func="store"
          text="Store"
          height='40px'
          args={[storeVal]}
        >
        </ContractWriter>
      </Flex>
      
    </Flex>
  )
}