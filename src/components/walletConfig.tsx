import {
    PhantomWalletAdapter
  } from '@solana/wallet-adapter-wallets';
  
  export const walletConfig = {
    wallets: [PhantomWalletAdapter
    ],
    onError: (error) => {
      console.error(error);
    },
  };
  