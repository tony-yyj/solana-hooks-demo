'use client'
import {Button} from "@/components/base/button";
import {useAccount} from "@orderly.network/hooks";
import {AccountStatusEnum} from "@orderly.network/types";
import {useMemo} from "react";

export default function SignIn() {
    const {account, state} = useAccount();

    const signIn = async () => {
        await account.createOrderlyKey(300)
    }
    const register = async () => {
        await account.createAccount();
    }
    const message = useMemo(() => {

        if (state.status <= AccountStatusEnum.NotConnected) {
            return 'pls connect wallet';
        }
        if (state.status <= AccountStatusEnum.Connected) {
            return 'pls sign in';
        }
        if (state.status <=AccountStatusEnum.DisabledTrading) {
            return 'pls enable trading';
        }
        return 'all done';
    }, [state]);
    return (
        <div>
            <h2>{message}</h2>
            <Button onClick={register}>register account</Button>
            <Button onClick={signIn}> enable trading</Button>
        </div>
    )
}