const { ethers } = require("hardhat");

const deployStrat = async () => {

    const ProportionalPayoutStrategyFactory = await ethers.getContractFactory("ProportionalPayoutStrategy");
    console.log("Deploying ProportionalPayoutStrategy...");

    // address _allo, string memory _name
    const ProportionalPayoutStrategy = await ProportionalPayoutStrategyFactory.deploy(
        "0x8dde1922d5f772890f169714faceef9551791caf", // allo addy 
        "mocha" // name of payout  
    );
    await ProportionalPayoutStrategy.deployed();
    console.log('Deployed ProportionalPayoutStrategy to:', ProportionalPayoutStrategy.address);

    // 0xD8cC6f67b33b15Fa3b6b17cE5AC9625962a904fE -> proportaional payout strategy
    
}

const deployReg = async () => {
    const RegistryFactory = await ethers.getContractAt("Registry")

    console.log('deploying registry')


}

//hardhat automatically compiles
async function main() {
    // deployStrat()  // 0xD8cC6f67b33b15Fa3b6b17cE5AC9625962a904fE
    deployReg()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
