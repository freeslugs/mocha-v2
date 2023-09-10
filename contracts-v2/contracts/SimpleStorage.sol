// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

//Declares a new contract
contract SimpleStorage {
    //Storage. Persists in between transactions
    uint x;

    //Allows the unsigned integer stored to be changed
    function set(uint newValue) external {
        x = newValue;
    }
    
    //Returns the currently stored unsigned integer
    function get() external returns (uint)  {
        return x;
    }
}