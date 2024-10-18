'use client'
import {OrderlyConfigProvider} from "@orderly.network/hooks";
import {ReactNode} from "react";
import {DefaultSolanaWalletAdapter} from "@orderly.network/default-solana-adapter";
import InitSolana from "@/context/initSolana";

const brokerId = 'woofi_pro';

export default function AppProvider({children}: { children: ReactNode }) {
    const solanaWalletAdapter = new DefaultSolanaWalletAdapter();
    return (
        <InitSolana>

            <OrderlyConfigProvider walletAdapters={[solanaWalletAdapter]} brokerName={'WOOFiPro'} brokerId={brokerId}
                                   networkId={"testnet"}>
                {children}

            </OrderlyConfigProvider>
        </InitSolana>
    )

}