import {idl} from "./dice_roll"
import { Connection, PublicKey, clusterApiUrl, Keypair } from "@solana/web3.js";
// import {Wallet}  from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
export const commitmentLevel = "processed";
export const endpoint = "https://api.devnet.solana.com";
export const connection = new Connection(endpoint, commitmentLevel);

export const programId = new PublicKey("DJecLubDCCV3KuQyw5Hg6Yf4UaA1GNdwt4TyFoJgo56b");
export const programInterface = JSON.parse(JSON.stringify(idl));

import json_secret from './wallet.json'
import { WalletProvider, AnchorWallet, Wallet } from "@solana/wallet-adapter-react";
// const x = 'utils/mywallet/wallet.json';
// export const secret = fs.readFileSync(jsonFilePath, 'utf8');
const t = require("@project-serum/anchor")
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
const secret = Uint8Array.from(json_secret);
const vendor = Keypair.fromSecretKey(secret);
export const vendor_wallet = new NodeWallet(vendor)
const preflightCommitment = "processed";
const commitment = "processed";
export const vendor_provider = new anchor.AnchorProvider(connection, vendor_wallet , {
    preflightCommitment,
    commitment,
    });

// const y = 'utils/stake.json'
// export const stake = Uint8Array.from(JSON.parse(fs.readFileSync(y, 'utf8')));

// const z = 'utils/contracts_wallet.json'
// export const cw = Uint8Array.from(JSON.parse(fs.readFileSync(y, 'utf8')));
