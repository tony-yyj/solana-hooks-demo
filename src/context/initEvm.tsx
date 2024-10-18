import {ReactNode, useEffect, useState} from "react";
import {initOnBoard} from "@/utils/blockNative.util";

export default function InitEvm({children}: {children: ReactNode}) {
    const [initWallet, setInitWallet] = useState(false);
    useEffect(() => {
        initOnBoard().then(() => {
            setInitWallet(true);
        });
    }, []);
    if (!initWallet) return;
    return children;
}