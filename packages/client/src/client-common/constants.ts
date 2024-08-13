import { NetworkDeployment, SupportedNetwork } from "./interfaces/common";
import { activeContractsList } from "dms-contracts-lib-v2";
import { Network } from "@ethersproject/networks";

export const LIVE_CONTRACTS: { [K in SupportedNetwork]: NetworkDeployment } = {
    kios_mainnet: {
        PhoneLinkCollectionAddress: activeContractsList.kios_mainnet.PhoneLinkCollection,
        LoyaltyTokenAddress: activeContractsList.kios_mainnet.LoyaltyToken,
        ValidatorAddress: activeContractsList.kios_mainnet.Validator,
        CurrencyRateAddress: activeContractsList.kios_mainnet.CurrencyRate,
        ShopAddress: activeContractsList.kios_mainnet.Shop,
        LedgerAddress: activeContractsList.kios_mainnet.Ledger,
        LoyaltyProviderAddress: activeContractsList.kios_mainnet.LoyaltyProvider,
        LoyaltyConsumerAddress: activeContractsList.kios_mainnet.LoyaltyConsumer,
        LoyaltyExchangerAddress: activeContractsList.kios_mainnet.LoyaltyExchanger,
        LoyaltyTransferAddress: activeContractsList.kios_mainnet.LoyaltyTransfer,
        LoyaltyBridgeAddress: activeContractsList.kios_mainnet.LoyaltyBridge,
        network: 215120,
        web3Endpoint: "https://rpc.main.acccoin.io/",
        relayEndpoint: "https://relay.main.acccoin.io/"
    },
    kios_testnet: {
        PhoneLinkCollectionAddress: activeContractsList.kios_testnet.PhoneLinkCollection,
        LoyaltyTokenAddress: activeContractsList.kios_testnet.LoyaltyToken,
        ValidatorAddress: activeContractsList.kios_testnet.Validator,
        CurrencyRateAddress: activeContractsList.kios_testnet.CurrencyRate,
        ShopAddress: activeContractsList.kios_testnet.Shop,
        LedgerAddress: activeContractsList.kios_testnet.Ledger,
        LoyaltyProviderAddress: activeContractsList.kios_testnet.LoyaltyProvider,
        LoyaltyConsumerAddress: activeContractsList.kios_testnet.LoyaltyConsumer,
        LoyaltyExchangerAddress: activeContractsList.kios_testnet.LoyaltyExchanger,
        LoyaltyTransferAddress: activeContractsList.kios_testnet.LoyaltyTransfer,
        LoyaltyBridgeAddress: activeContractsList.kios_testnet.LoyaltyBridge,
        network: 215125,
        web3Endpoint: "https://rpc.test.acccoin.io/",
        relayEndpoint: "https://relay.test.acccoin.io/"
    },
    kios_devnet: {
        PhoneLinkCollectionAddress: activeContractsList.kios_devnet.PhoneLinkCollection,
        LoyaltyTokenAddress: activeContractsList.kios_devnet.LoyaltyToken,
        ValidatorAddress: activeContractsList.kios_devnet.Validator,
        CurrencyRateAddress: activeContractsList.kios_devnet.CurrencyRate,
        ShopAddress: activeContractsList.kios_devnet.Shop,
        LedgerAddress: activeContractsList.kios_devnet.Ledger,
        LoyaltyProviderAddress: activeContractsList.kios_devnet.LoyaltyProvider,
        LoyaltyConsumerAddress: activeContractsList.kios_devnet.LoyaltyConsumer,
        LoyaltyExchangerAddress: activeContractsList.kios_devnet.LoyaltyExchanger,
        LoyaltyTransferAddress: activeContractsList.kios_devnet.LoyaltyTransfer,
        LoyaltyBridgeAddress: activeContractsList.kios_devnet.LoyaltyBridge,
        network: 24680,
        web3Endpoint: "http://rpc-side.dev.acccoin.io:28545/",
        relayEndpoint: "http://relay.dev.acccoin.io:27070/"
    },
    localhost: {
        PhoneLinkCollectionAddress: "",
        LoyaltyTokenAddress: "",
        ValidatorAddress: "",
        CurrencyRateAddress: "",
        ShopAddress: "",
        LedgerAddress: "",
        LoyaltyProviderAddress: "",
        LoyaltyConsumerAddress: "",
        LoyaltyExchangerAddress: "",
        LoyaltyTransferAddress: "",
        LoyaltyBridgeAddress: "",
        network: 24680,
        web3Endpoint: "http://localhost:8545/",
        relayEndpoint: "http://localhost:7070/"
    }
};

export const ADDITIONAL_NETWORKS: Network[] = [
    {
        name: SupportedNetwork.KIOS_MAINNET,
        chainId: 215120
    },
    {
        name: SupportedNetwork.KIOS_TESTNET,
        chainId: 215125
    },
    {
        name: SupportedNetwork.KIOS_DEVNET,
        chainId: 24680
    }
];
