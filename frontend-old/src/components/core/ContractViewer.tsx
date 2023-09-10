import { Text } from '@chakra-ui/react'
import { useAccount, useContractRead } from 'wagmi'

export const ContractViewer = (props) => {
    const { address, isConnected} = useAccount()
    const { data } = useContractRead({
        address: props.addr,
        abi: props.abi,
        functionName: props.func,
        watch: true,
        //there's also useContractReads which reads in bulk seems like
        // args: props.args
    })
    return (
        <Text color="text" fontSize="xs">
            useContractRead - {isConnected ? " found contract at " + props.addr + " let's call " + props.func + "... we get: " + data : 'Please Connect Wallet'}
        </Text>
    )
}