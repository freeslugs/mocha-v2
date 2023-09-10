import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => (
  
  <Flex
    direction="column"
    justifyContent="flex-start"
    bg="gray.50"
    color="text"
    _dark={{
      bg: 'gray.900',
      color: 'white',
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
)
