import { Stack, Text, Button, useColorMode } from '@chakra-ui/react'
import { useAccount, useWaitForTransaction, usePrepareContractWrite, useContractWrite } from 'wagmi'

export const ContractWriter = (props) => {
    const { address, isConnected} = useAccount()
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    const { config, isError, error } = usePrepareContractWrite({
        address: props.addr,
        abi: props.abi,
        functionName: props.func,
        args: props.args
    })
    const { data , write } = useContractWrite(config)
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash:  data?.hash,
        onSuccess(data) {
            console.log('Success!!!')
        },
        onError(error) {
            console.log('Error', error)
        },
    })
    
    let didSomething = false
    return (
        <>
        <Stack direction='row' spacing={4}>
            <Button 
                isLoading={isLoading}
                spinnerPlacement='start' 
                loadingText='Pending' 
                variant='outline' 
                colorScheme={isDark ? "green" : "blue"} 
                disabled={!write} 
                onClick={() => {
                    write()
                    didSomething = true
                }}
            >
                Store
            </Button>
            {isError && <Text color="text">ERROR: {error.message}</Text>}
            {isSuccess && didSomething && <Text color="text">DONE!</Text>}
        </Stack>
        
        </>
    )
}


