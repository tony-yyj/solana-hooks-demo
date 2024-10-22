'use client'
import {OrderlyConfigProvider} from "@orderly.network/hooks";
import {ReactNode} from "react";
import InitSolana from "@/context/initSolana";

const brokerId = 'woofi_pro';

export default function AppProvider({children}: { children: ReactNode }) {
    return (

            <InitSolana>

                <OrderlyConfigProvider  brokerName={'WOOFiPro'}
                                       brokerId={brokerId}
                                       networkId={"testnet"}>
                    {children}

                </OrderlyConfigProvider>
            </InitSolana>
    )

}