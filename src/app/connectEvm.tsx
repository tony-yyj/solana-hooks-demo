'use client'
import {Button} from "@/components/base/button";
import {useConnectWallet, useSetChain} from "@web3-onboard/react";
import {useAccount} from "@orderly.network/hooks";
import {useEffect} from "react";
import {ChainNamespace} from "@orderly.network/types";

export default function ConnectEvm(){
    const [{wallet,}, connect] = useConnectWallet();
    const {account} = useAccount();
    const [
        {
            connectedChain, // the current chain the user's wallet is connected to
        },
    ] = useSetChain();
    const onConnect = () => {
        connect().then(res => {
            console.log('res', res);


        })
    }

    useEffect(() => {
        if (!wallet) {

            account.disconnect();
            return;
        }
        account.setAddress(
            wallet.accounts[0].address,
            {

                chain: {
                    id: parseInt(connectedChain!.id),
                    namespace: ChainNamespace.evm,
                },
                provider: wallet.provider,
                wallet: {
                    name: wallet.label
                },
            },
        )

    }, [wallet, connectedChain]);

    return (
        <div>
            <Button onClick={onConnect}>Connect evm</Button>

        </div>
    )
}