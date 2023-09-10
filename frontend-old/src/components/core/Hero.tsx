import { Flex, Heading } from '@chakra-ui/react'
import { config } from '../../utils/config'

export const Hero = () => (
  <Flex
    justifyContent="center"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Heading fontSize="2vw">Welcome to {config.name}</Heading>
  </Flex>
)
