import { Helper } from "../utils";
import { Client, Context, ContextBuilder } from "dms-sdk-client-v2";

async function main() {
    const userInfo = Helper.loadUserInfo();
    const contextParams = ContextBuilder.buildContextParams(Helper.NETWORK, userInfo.wallet.privateKey);
    if (Helper.RELAY_ENDPOINT !== "") contextParams.relayEndpoint = Helper.RELAY_ENDPOINT;
    if (Helper.WEB3_ENDPOINT !== "") contextParams.web3Provider = Helper.WEB3_ENDPOINT;
    const context: Context = new Context(contextParams);
    const client = new Client(context);

    const phoneHash = client.link.getPhoneHash(userInfo.phone);
    console.log(`Phone Hash: ${phoneHash}`);
    const account = await client.link.toAddress(phoneHash);
    console.log(`Account: ${account} - ${userInfo.wallet.address}`);
    const hash = await client.link.toPhoneHash(userInfo.wallet.address);
    console.log(`Hash: ${hash} - ${phoneHash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
