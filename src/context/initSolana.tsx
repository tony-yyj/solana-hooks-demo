import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import React,{useMemo} from "react";
import {clusterApiUrl} from "@solana/web3.js";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function InitSolana({children}: {children: React.ReactNode}) {
    const network = WalletAdapterNetwork.Devnet;
    const endPoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => {
        return [
            // new PhantomWalletAdapter(),
            // // new WalletConnectWalletAdapter(),
            // new SolflareWalletAdapter(),
            // new GlowWalletAdapter(),
            // new CoinbaseWalletAdapter()
        ];
    }, []);

    return (
        <ConnectionProvider endpoint={endPoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>

                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

