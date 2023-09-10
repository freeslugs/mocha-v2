# Transfer

*@thelostone-mc &lt;aditya@gitcoin.co&gt;, @0xKurt &lt;kurt@gitcoin.co&gt;, @codenamejason &lt;jason@gitcoin.co&gt;, @0xZakk &lt;zakk@gitcoin.co&gt;, @nfrgosselin &lt;nate@gitcoin.co&gt;*

> Transfer contract

A helper contract to transfer tokens within Allo protocol

*Handles the transfer of tokens to an address*

## Methods

### NATIVE

```solidity
function NATIVE() external view returns (address)
```

Address of the native token




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |




## Errors

### AMOUNT_MISMATCH

```solidity
error AMOUNT_MISMATCH()
```

Thrown when the amount of tokens sent does not match the amount of tokens expected





