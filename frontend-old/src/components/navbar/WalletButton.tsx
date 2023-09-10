import { Image, Text, Button, useColorMode } from '@chakra-ui/react'
import { useAccount } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';

// export const WalletButton = () => {
//     // const { colorMode } = useColorMode()
//     // const isDark = colorMode === 'dark';



//     // // Make sure that this component is wrapped with ConnectKitProvider
//     // const { address, isConnecting, isDisconnected } = useAccount();
//     // if (isConnecting) return <Text>Connecting...</Text>;
//     // if (isDisconnected) return <Text>Disconnected</Text>;
    


//     return (<ConnectButton />
        
//         // <>
//         // <Button m='5px'
//         // border='2px'
//         // borderColor={isDark ? 'white' : 'black'}
//         // borderRadius={5}
//         // height='60%' 
//         // color="text"
//         // // disabled={loading}
//         // >
//         //     Connect Wallet
//         // </Button>
//         // </>
//     )
// }