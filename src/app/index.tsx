import {FC, PropsWithChildren, useMemo} from "react";
import {OrderlyConfigProvider} from "@orderly.network/hooks";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';

import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {clusterApiUrl} from "@solana/web3.js";

const brokerId = "<your id>";
const brokerName = "<your name>";

export const App: FC<PropsWithChildren> = ({children}) => {
    const network = WalletAdapterNetwork.Devnet;
    const endPoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => {
        return [
            new PhantomWalletAdapter(),

        ];
    }, []);
    return (
        <ConnectionProvider endpoint={endPoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>

                    <OrderlyConfigProvider brokerName={brokerName} brokerId={brokerId} networkId="testnet">
                        {children}
                    </OrderlyConfigProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

