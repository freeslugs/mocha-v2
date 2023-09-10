import { Link, Text, Spacer, Flex, FlexProps, Box, useColorMode } from '@chakra-ui/react'
import { BlockNumber } from './BlockNumber'
import { Socials } from './Socials'

export const Footer = (props: FlexProps) => {
    
    return  (
        <Flex  
        height='30px'
        bgClip="text"
        justifyContent="center"
        alignItems='center'
        flexDirection='row'
          {...props} 
        >
          <Text fontSize='xs' p='5px' color="text">by</Text>
          <Link fontSize='xs' color="text" href="https://twitter.com/RiseoftheJAPES">J.Paul Meyer</Link>
          <Text fontSize='xs' p='5px' color="text">via</Text>
          <Link fontSize='xs' color="text" href='https://choosealicense.com/licenses/mit/'> MIT License</Link>
          <Spacer />
          <Socials />
          <Spacer />
          <Box fontSize='xs' as='b' m='10px'>
            <BlockNumber />
          </Box>
        </Flex>
      )
}