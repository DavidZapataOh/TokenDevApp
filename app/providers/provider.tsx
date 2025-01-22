'use client';

import {PrivyProvider} from '@privy-io/react-auth';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider 
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
    config={{
    "appearance": {
        "accentColor": "#b72c7a",
        "theme": "#05000c",
        "showWalletLoginFirst": false,
        "logo": "/Logo.png",
        "walletChainType": "ethereum-only",
        "walletList": [
        "detected_ethereum_wallets"
        ]
    },
    "loginMethods": [
        "email",
        "google",
        "github",
        "wallet",
        "twitter"
    ],
    "fundingMethodConfig": {
        "moonpay": {
        "useSandbox": true
        }
    },
    "embeddedWallets": {
        "createOnLogin": "users-without-wallets",
        "requireUserPasswordOnCreate": false,
        "showWalletUIs": true
    },
    "mfa": {
        "noPromptOnMfaRequired": false
    }
    }}
    >
    {children}
    </PrivyProvider>
  );
}