'use client'
import {OrderlyConfigProvider} from "@orderly.network/hooks";
import {ReactNode} from "react";
import InitSolana from "@/context/initSolana";
import InitEvm from "@/context/initEvm";

const brokerId = 'woofi_pro';

export default function AppProvider({children}: { children: ReactNode }) {
    return (
        <InitEvm>

            <InitSolana>

                <OrderlyConfigProvider  brokerName={'WOOFiPro'}
                                       brokerId={brokerId}
                                       networkId={"testnet"}>
                    {children}

                </OrderlyConfigProvider>
            </InitSolana>
        </InitEvm>
    )

}