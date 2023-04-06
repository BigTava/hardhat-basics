import { ethers, run, network } from "hardhat"

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")

    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(`SimpleStorage deployed to ${simpleStorage.address}`)
    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    // Retrieve
    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Update Value
    const transactionResponse = await simpleStorage.store("10")
    const transactionReceipt = await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Current Favorite Number: ${updatedValue.toString()}`)
}

async function verify(contractAddress: String, args: any[]) {
    console.log("Veryfing contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            contructorArguments: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
