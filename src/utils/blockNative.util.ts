"use client";
import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
// Required for Transaction Notifications and Transaction Preview
const apiKey = "a2c206fa-686c-466c-9046-433ea1bf5fa6";

export async function initOnBoard() {
    const injected = injectedModule();
    const testChains = [
        {
            id: `0x${(421614).toString(16)}`,
            token: "ETH",
            label: "Arbitrum Sepolia",
            rpcUrl: "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
        },
    ];


    return Promise.resolve().then(() =>
        init({
            apiKey,
            wallets: [injected],
            chains: [...testChains],
            appMetadata: {
                name: "Orderly",
                description: "Orderly",
                icon: "/orderly.svg",
            },
            theme: {
                "--w3o-background-color": "#1b112c",
                "--w3o-foreground-color": "#28183e",
                "--w3o-text-color": "#ffffff",
                "--w3o-border-color": "#3a2b50",
                "--w3o-action-color": "#b084e9",
                "--w3o-border-radius": "16px",
                "--w3o-font-family": "Manrope, sans-serif",
            },
            accountCenter: {
                desktop: {
                    enabled: false,
                },
                mobile: {
                    enabled: false,
                },
            },
            connect: {
                autoConnectLastWallet: true,
            },
        })
    );
}
