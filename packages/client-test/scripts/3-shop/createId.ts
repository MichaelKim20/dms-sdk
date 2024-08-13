import { ContractUtils, LoyaltyNetworkID } from "dms-sdk-client-v2";
import { Wallet } from "ethers";
import { Helper } from "../utils";

async function main() {
    const wallet = Wallet.createRandom();
    let shopId = "";

    if (Helper.NETWORK === "kios_mainnet") {
        shopId = ContractUtils.getShopId(wallet.address, LoyaltyNetworkID.KIOS_MAINNET);
    } else if (Helper.NETWORK === "kios_testnet") {
        shopId = ContractUtils.getShopId(wallet.address, LoyaltyNetworkID.KIOS_TESTNET);
    } else {
        shopId = ContractUtils.getShopId(wallet.address, LoyaltyNetworkID.KIOS_TESTNET);
    }

    console.log("처리결과입니다.");
    console.log(`shopId: ${shopId}`);
    console.log(`address: ${wallet.address}`);
    console.log(`privateKey: ${wallet.privateKey}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
