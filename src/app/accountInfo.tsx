'use client'
import { useAccountInfo} from "@orderly.network/hooks";

export default function AccountInfo(){
    const { data: account, isLoading } = useAccountInfo();
    if (!account  || isLoading) {
        return 'loading';
    }
    const {
        account_id,
    } = account;
    return (
        <div>
            <p>account_id: {account_id}</p>

        </div>
    )
}