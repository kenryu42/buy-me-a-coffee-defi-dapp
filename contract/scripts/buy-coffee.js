// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Returns the Ethers balance of a given address
async function getBalance(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);

    return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balance for a list of addresses
async function printBalances(addresses) {
    let idx = 0;

    for (const address of addresses) {
        const balance = await getBalance(address);
        console.log(`Address ${idx} balance: ${balance}`);
        idx++;
    }
}

// Logs the memos stored on-chain from coffee purchases.
async function printMemos(memos) {
    for (const memo of memos) {
        console.log(
            `At ${memo.timestamp}, ${memo.name} (${memo.from}) said: "${memo.message}"`
        );
    }
}

async function main() {
    // Get example accouts.
    const tip = { value: hre.ethers.utils.parseEther("1") };
    const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

    // Get the contract to deploy & deploy it.
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
    const addresses = [
        owner.address,
        tipper.address,
        tipper2.address,
        tipper3.address,
        buyMeACoffee.address,
    ];

    await buyMeACoffee.deployed();

    console.log(`BuyMeACoffee address: ${buyMeACoffee.address}`);

    // Check balances before the coffee purchase.
    console.log("== start ==");
    await printBalances(addresses);

    // Buy the owner a few coffees.
    await buyMeACoffee
        .connect(tipper)
        .buyCoffee("Tokyo", "Enjoy Tokyo Coffee!", tip);
    await buyMeACoffee
        .connect(tipper2)
        .buyCoffee("Saitama", "Enjoy Saitama One Punch!", tip);
    await buyMeACoffee
        .connect(tipper3)
        .buyCoffee("Kyoto", "Enjoy Uji Matcha!", tip);
    // Check balances after coffee purchase.
    console.log("== bought coffee ==");
    await printBalances(addresses);
    // Withdraw funds.
    await buyMeACoffee.withdrawTips();
    // Check balance after withdraw.
    console.log("== after withdraw ==");
    await printBalances(addresses);
    // Read all the memos left for the owner.
    console.log("== memos ==");
    const memos = await buyMeACoffee.getMemos();
    printMemos(memos);
    let ownerAddress = await buyMeACoffee.owner();
    console.log("== owner before ==");
    console.log(ownerAddress);
    console.log("== owner after ==");
    await buyMeACoffee.changeOwner(tipper3.address);
    ownerAddress = await buyMeACoffee.owner();
    console.log(ownerAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
