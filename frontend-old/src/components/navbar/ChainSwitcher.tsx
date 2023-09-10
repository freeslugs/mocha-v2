import { useColorMode, IconButton } from '@chakra-ui/react'

export const ChainSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
        m='5px'
        border='2px'
        borderColor={isDark ? 'white' : 'black'}
        borderRadius={5}  
    
    //   icon={isDark ? <SunIcon color="white"/> : <MoonIcon color="black"/>}
      aria-label="Switch Chains"
      colorScheme="black"
      onClick={toggleColorMode}
    />
  )
}