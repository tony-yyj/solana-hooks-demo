'use client'
import { Button } from "@/components/base/button";
import {useAccount} from "@orderly.network/hooks";

export default function SignIn() {
    const {account} = useAccount();

    const signIn = async () => {
        await account.createOrderlyKey(300)
    }
    const register = async () => {
        await account.createAccount();
    }
    return (
        <div>
            <Button onClick={register}>register account</Button>
            <Button onClick={signIn}> enable trading</Button>
        </div>
    )
}