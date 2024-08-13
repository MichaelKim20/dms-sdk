import { Helper } from "../utils";
import { Client, Context, ContextBuilder } from "dms-sdk-client-v2";
import { BOACoin } from "../../src/Amount";

async function main() {
    const userInfo = Helper.loadUserInfo();
    const contextParams = ContextBuilder.buildContextParams(Helper.NETWORK, userInfo.wallet.privateKey);
    if (Helper.RELAY_ENDPOINT !== "") contextParams.relayEndpoint = Helper.RELAY_ENDPOINT;
    if (Helper.WEB3_ENDPOINT !== "") contextParams.web3Provider = Helper.WEB3_ENDPOINT;
    const context: Context = new Context(contextParams);
    const client = new Client(context);

    const pointAmount = BOACoin.make("100");
    const tokenAmount = new BOACoin(await client.currency.pointToToken(pointAmount.value));
    console.log(`point amount : ${pointAmount.toDisplayString(true, 2)} POINT`);
    console.log(`token amount : ${tokenAmount.toDisplayString(true, 2)} TOKEN`);
    const amount1 = new BOACoin(await client.currency.pointToCurrency(pointAmount.value, "krw"));
    console.log(`currency amount : ${amount1.toDisplayString(true, 2)} KRW`);

    const symbols = ["point", "kios", "usd", "krw", "jpy", "cny", "php", "eur"];
    for (const symbol of symbols) {
        const rate = await client.currency.getRate(symbol);
        console.log(`${symbol.toUpperCase()} rate : ${rate.toString()}`);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
