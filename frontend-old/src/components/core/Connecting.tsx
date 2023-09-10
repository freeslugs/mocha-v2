import { Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

export const Connecting = () => {
    const { address, isConnected} = useAccount()

    return (
        <Text color="text" fontSize="xs">
            Use the useAccount hook to access the address: {isConnected ? " " + address : 'Please Connect Wallet'}
        </Text>
    )
}