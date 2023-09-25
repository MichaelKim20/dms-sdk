/**
 *  Includes various useful functions for the solidity
 *
 *  Copyright:
 *      Copyright (c) 2022 BOSAGORA Foundation All rights reserved.
 *
 *  License:
 *       MIT License. See LICENSE for details.
 */

import * as crypto from "crypto";
import { defaultAbiCoder } from "@ethersproject/abi";
import { Signer } from "@ethersproject/abstract-signer";
import { BigNumberish } from "@ethersproject/bignumber";
import { arrayify } from "@ethersproject/bytes";
import { keccak256 } from "@ethersproject/keccak256";
import { verifyMessage } from "@ethersproject/wallet";

export class ContractUtils {
    /**
     * It generates hash values.
     * @param data The source data
     */
    public static sha256(data: Buffer): Buffer {
        return crypto
            .createHash("sha256")
            .update(data)
            .digest();
    }

    public static sha256String(data: string): string {
        return ContractUtils.BufferToString(
            crypto
                .createHash("sha256")
                .update(Buffer.from(data.trim()))
                .digest()
        );
    }

    /**
     * Convert hexadecimal strings into Buffer.
     * @param hex The hexadecimal string
     */
    public static StringToBuffer(hex: string): Buffer {
        const start = hex.substring(0, 2) === "0x" ? 2 : 0;
        return Buffer.from(hex.substring(start), "hex");
    }

    /**
     * Convert Buffer into hexadecimal strings.
     * @param data The data
     */
    public static BufferToString(data: Buffer): string {
        return "0x" + data.toString("hex");
    }

    public static getTimeStamp(): number {
        return Math.floor(new Date().getTime() / 1000);
    }

    public static delay(interval: number): Promise<void> {
        return new Promise<void>((resolve, _) => {
            setTimeout(resolve, interval);
        });
    }

    public static cacheEVMError(error: IEVMError): string {
        while (error.error !== undefined) error = error.error;
        return error.data.reason;
    }

    public static getRequestId(emailHash: string, address: string, nonce: BigNumberish): string {
        const encodedResult = defaultAbiCoder.encode(
            ["bytes32", "address", "uint256", "bytes32"],
            [emailHash, address, nonce, crypto.randomBytes(32)]
        );
        return keccak256(encodedResult);
    }

    public static async sign(signer: Signer, hash: string, nonce: BigNumberish): Promise<string> {
        const encodedResult = defaultAbiCoder.encode(
            ["bytes32", "address", "uint256"],
            [hash, await signer.getAddress(), nonce]
        );
        const message = arrayify(keccak256(encodedResult));
        return signer.signMessage(message);
    }

    public static async signPayment(
        signer: Signer,
        purchaseId: string,
        amount: BigNumberish,
        userEmail: string,
        shopId: string,
        nonce: BigNumberish
    ): Promise<string> {
        const encodedResult = defaultAbiCoder.encode(
            ["string", "uint256", "bytes32", "string", "address", "uint256"],
            [purchaseId, amount, userEmail, shopId, await signer.getAddress(), nonce]
        );
        const message = arrayify(keccak256(encodedResult));
        return signer.signMessage(message);
    }

    public static async signExchange(
        signer: Signer,
        userEmail: string,
        amount: BigNumberish,
        nonce: BigNumberish
    ): Promise<string> {
        const encodedResult = defaultAbiCoder.encode(
            ["bytes32", "uint256", "address", "uint256"],
            [userEmail, amount, await signer.getAddress(), nonce]
        );
        const message = arrayify(keccak256(encodedResult));
        return signer.signMessage(message);
    }

    public static verifyPayment(
        purchaseId: string,
        amount: BigNumberish,
        userEmail: string,
        shopId: string,
        signerAddress: string,
        nonce: BigNumberish,
        signature: string
    ): boolean {
        const encodedResult = defaultAbiCoder.encode(
            ["string", "uint256", "bytes32", "string", "address", "uint256"],
            [purchaseId, amount, userEmail, shopId, signerAddress, nonce]
        );
        const message = arrayify(keccak256(encodedResult));
        let res: string;
        try {
            res = verifyMessage(message, signature);
        } catch (error) {
            return false;
        }
        return res.toLowerCase() === signerAddress.toLowerCase();
    }

    public static verifyExchange(
        signerAddress: string,
        userEmail: string,
        amount: BigNumberish,
        nonce: BigNumberish,
        signature: string
    ): boolean {
        const encodedResult = defaultAbiCoder.encode(
            ["bytes32", "uint256", "address", "uint256"],
            [userEmail, amount, signerAddress, nonce]
        );
        const message = arrayify(keccak256(encodedResult));
        let res: string;
        try {
            res = verifyMessage(message, signature);
        } catch (error) {
            return false;
        }
        return res.toLowerCase() === signerAddress.toLowerCase();
    }
}

interface IEVMError {
    error?: IEVMError;
    data: {
        reason: string;
    };
}
