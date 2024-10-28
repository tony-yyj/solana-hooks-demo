'use client'
import {WalletDisconnectButton, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {useEffect, useMemo, useRef} from "react";
import {useAccount} from "@orderly.network/hooks";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";
import {ChainNamespace} from "@orderly.network/types";

export default function ConnectSolana() {
    const {account, state} = useAccount();
    const {
        signMessage,
        sendTransaction,
        publicKey,
        wallet,
        connect: ConnectSolana,
        disconnect: DisconnectSolana
    } = useWallet();
    const {connection} = useConnection();
    const {setVisible: setModalVisible} = useWalletModal();


    const solanaPromiseRef = useRef<{

        walletSelect: Promise<any> | null;
        connect: Promise<any> | null;
        walletSelectResolve: (value: any) => void;
        walletSelectReject: (value: any) => void;
        connectResolve: (value: any) => void;
        connectReject: (value: any) => void;

    }>({
        walletSelect: null,
        connect: null,
        walletSelectResolve: () => {
        },
        walletSelectReject: () => {
        },
        connectReject: () => {
        },
        connectResolve: () => {
        },
    });

    const disconnect = async () => {
        await account.disconnect();
        await DisconnectSolana();
        initPromiseRef();
    }
    const isManual = useRef(false);


    const initPromiseRef = () => {
        solanaPromiseRef.current.walletSelect = new Promise((resolve, reject) => {
            console.log('33')
            solanaPromiseRef.current.walletSelectResolve = resolve;
            solanaPromiseRef.current.walletSelectReject = reject
        })
        solanaPromiseRef.current.connect = new Promise((resolve, reject) => {
            console.log('-- 22');
            solanaPromiseRef.current.connectResolve = resolve;
            solanaPromiseRef.current.connectReject = reject;
        })
    }


    useEffect(() => {
        initPromiseRef();
    }, [])

    useEffect(() => {
        if (!wallet || !publicKey) {
            return;
        }
        console.log('-- publick', publicKey)
        if (solanaPromiseRef.current) {
            solanaPromiseRef.current.connectResolve(publicKey?.toBase58());
        }

        if (isManual.current) {
            return;
        }
        console.log('-- tt')
        account.setAddress(
            publicKey.toBase58(),
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

    }, [publicKey, wallet, isManual.current]);

    useEffect(() => {
        if (!wallet) {
            return;
        }
        console.log('-- connect', wallet)

        if (solanaPromiseRef.current) {
            solanaPromiseRef.current.walletSelectResolve(wallet)
        }

        ConnectSolana().then((res) => {
            console.log('-- connect res', res)
        }).catch(e => {

            solanaPromiseRef.current.connectReject(e)
        });

    }, [wallet, ConnectSolana])


    const connect = async () => {
        isManual.current = true;
        if (!solanaPromiseRef.current) {
            return;
        }
        if (!wallet) {
            setModalVisible(true)
        } else {
            solanaPromiseRef.current.walletSelectResolve(wallet)
            if (!publicKey) {
                try {

                    ConnectSolana()
                } catch (e) {
                    solanaPromiseRef.current.connectReject(e)
                }
            } else {
                solanaPromiseRef.current.connectResolve(publicKey?.toBase58());
            }

        }


        console.log('-- connect fn', wallet, publicKey)
        Promise.all([solanaPromiseRef.current.walletSelect, solanaPromiseRef.current.connect]).then(([wallet, userAddress]) => {
            console.log('-- res', wallet, userAddress);
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

        }).catch((e) => {
            console.log('connect solana error', e);
        }).finally(() => {
            console.log('-- finally')
            initPromiseRef();
        });
    }

    return (
        <div suppressHydrationWarning>

            <WalletMultiButton/>
            <WalletDisconnectButton/>
            <div>Address: {state.address}</div>
            <div className='text-white flex gap-3'>
                <button className='bg-blue-700 px-2 py-1 rounded-md' onClick={connect}>connect solana</button>
                <button className='bg-amber-800  px-2 py-1 rounded-md' onClick={disconnect}>disconnect solana</button>
            </div>

        </div>
    )
}