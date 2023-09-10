# SafeTransferLib

*Solady (https://github.com/vectorized/solady/blob/main/src/utils/SafeTransferLib.sol)Modified from Solmate (https://github.com/transmissions11/solmate/blob/main/src/utils/SafeTransferLib.sol)*



Safe ETH and ERC20 transfer library that gracefully handles missing return values.

*Note: - For ETH transfers, please use `forceSafeTransferETH` for gas griefing protection. - For ERC20s, this implementation won&#39;t check that a token has code,   responsibility is delegated to the caller.*



## Errors

### ApproveFailed

```solidity
error ApproveFailed()
```



*The ERC20 `approve` has failed.*


### ETHTransferFailed

```solidity
error ETHTransferFailed()
```



*The ETH transfer has failed.*


### TransferFailed

```solidity
error TransferFailed()
```



*The ERC20 `transfer` has failed.*


### TransferFromFailed

```solidity
error TransferFromFailed()
```



*The ERC20 `transferFrom` has failed.*



