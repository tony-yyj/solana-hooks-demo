'use client'
import {WalletDisconnectButton, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useEffect, useMemo} from "react";
import {useAccount} from "@orderly.network/hooks";
import {ChainNamespace} from "@orderly.network/types";

export default function ConnectSolana() {
    const {account, state} = useAccount();
    const {signMessage, sendTransaction, publicKey, wallet} = useWallet();
    const {connection}= useConnection();

    const userAddress = useMemo(() => {
        if (!publicKey) return;
        return publicKey.toBase58();

    }, [publicKey]);

    useEffect(() => {
        if (!wallet) return;
        if (!userAddress) return;
        account.setAddress(
            userAddress,
            {
                chain:
                    {
                        id: 901901901,
                        namespace: ChainNamespace.solana,
                    },
                provider: {
                    signMessage: signMessage,
                    connection,
                    sendTransaction,
                },
                wallet: {
                    name: wallet.adapter.name,
                }
            }

        )

    }, [userAddress, account, connection, signMessage, sendTransaction, wallet])
    return (
        <div suppressHydrationWarning>

            <WalletMultiButton/>
            <WalletDisconnectButton/>
            <div>Address: {state.address}</div>

        </div>
    )
}