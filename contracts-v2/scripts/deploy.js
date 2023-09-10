const {ethers} = require("hardhat")

//hardhat automatically compiles
async function main() {

  // const ProportionalPayoutStrategyFactory = await ethers.getContractFactory("ProportionalPayoutStrategy");
  // console.log("Deploying ProportionalPayoutStrategy...");
  // const ProportionalPayoutStrategy = await ProportionalPayoutStrategyFactory.deploy(
  //   "0x8dde1922d5f772890f169714faceef9551791caf",
  //   "mocha"
  // );
  // await ProportionalPayoutStrategy.deployed();
  // console.log('Deployed ProportionalPayoutStrategy to:', ProportionalPayoutStrategy.address);

  //0xD8cC6f67b33b15Fa3b6b17cE5AC9625962a904fE -> proportaional payout strategy
  
  // const alloProxyAddress = "0x79536CC062EE8FAFA7A19a5fa07783BD7F792206" // registry 
  const alloProxyAddress = '0x8dde1922d5f772890f169714faceef9551791caf'
  const [signer] = await ethers.getSigners();
  const allo = await ethers.getContractAt('IAllo', alloProxyAddress, signer);
  
  console.log('address', allo.address)
  // console.log(signer.address)

  const profileId = "0x365d6be8a0ab1293113b6405f746aa8e2bdcf768093da284aacf1d48bc61c939"
  // console.log(profileId)
  // console.log("freedom")
  // const strategyAddress = "0xD8cC6f67b33b15Fa3b6b17cE5AC9625962a904fE";
  const initData = "0x";
  const tokenAddress = "0x07865c6e87b9f70255377e024ace6630c1eaa37f";     //Goerli test token
  const amount = 0;
  // const metadata = {protocol: 1, pointer: "strategy pointer"};
  const metadata = [1,"strategy pointer"]
  const managers = ["0x0E900361363b64cF84111c383479Da9124BbD579"];
  console.log(allo)

  const registry = await  allo.getRegistry()

  console.log('registry', registry)


  // const tx = await allo.createPool(

  // )
  const tx = await allo.createPoolWithCustomStrategy(
    profileId, strategyAddress, initData, tokenAddress, amount, metadata, managers
  )
  

  await tx.wait();
  console.log(`Done! Transaction hash: ${tx.hash}`)

}
//hh run scripts/deploy.js
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

  // const registryAddress = await allo.getRegistry()
  // const registry = await ethers.getContractAt('IRegistry', registryAddress, signer);
  // console.log(registryAddress)

  const nonce = 3;
  const name = "Test Profile";
  // const metadataa = {
  //   uri: "ipfs://Qm...",
  //   data: "Test data"
  // };

  const metadataa = [1, "heybabyuup"] // protcol; pointer; 
  const members = [signer.address];
  const tx1 = await registry.createProfile(nonce, name, metadataa, "0x0E900361363b64cF84111c383479Da9124BbD579", members)