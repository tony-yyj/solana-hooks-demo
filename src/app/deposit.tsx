'use client'
import {Button} from "@/components/base/button";
import {useDeposit} from "@orderly.network/hooks";
import {useEffect} from "react";


export default function Deposit() {
    const {deposit, setQuantity} = useDeposit({
        address: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
        decimals: 6,
        srcChainId: 901901901,
        srcToken: 'USDC',
    });
    const onDeposit = () => {
        deposit().then();

    }

    useEffect(() => {
        setQuantity('11');

    }, [setQuantity])
    return (
        <div>

            <Button onClick={onDeposit}>Deposit</Button>
        </div>
    )
}