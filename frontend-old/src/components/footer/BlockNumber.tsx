import { Text } from '@chakra-ui/react'
import { useBlockNumber, useNetwork } from 'wagmi'

export const BlockNumber = () => {
    const { data, isError, isLoading } = useBlockNumber()
 
    if (isLoading) return <Text color="text">pending…</Text>
    if (isError) return <Text color="text">error</Text>
    return <Text color="text">{data}</Text>
}