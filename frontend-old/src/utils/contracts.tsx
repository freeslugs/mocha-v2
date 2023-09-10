// import erc20 from './abis/erc20.abi.json';
import simpleStorage from './abis/SimpleStorage.json';
//have to do .abi to pull the abi from the abi
//use console.log to make sure the abi you're pasting is actually an ABI i.e. a list of objects
export const contracts = {
    "simpleStorage": {
        "address": "0x912ce59144191c1204e64559fe8253a0e49e6548",
        "abi": simpleStorage
    }
}