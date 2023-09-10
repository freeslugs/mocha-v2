import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit';


export function Navbar() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontSize={'xl'} // Increased font size
            color={useColorModeValue('gray.800', 'white')}>
            Mocha
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'}
            width={'120px'}
            height={'40px'}
            flexShrink={0}
            borderRadius={'20px'}
            border={'1.3px solid #25E781'}>
            Sign In
          </Button>
          <ConnectButton
            as={'a'}
            display={{ base: 'inline-flex', md: 'inline-flex' }} // Changed to always display on all screen sizes
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.400'} // Changed color scheme to green
            href={'#'}
            width={'120px'}
            height={'40px'}
            flexShrink={0}
            borderRadius={'20px'}
            border={'1.3px solid #25E781'}
            _hover={{
              bg: 'green.300', // Changed hover color to a lighter green
            }}>
            Sign Up
          </ConnectButton>
          
        </Stack>
      </Flex>
    </Box>
  )
}