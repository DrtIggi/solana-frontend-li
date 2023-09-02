import {idl} from "./dice_roll"
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";


export const commitmentLevel = "processed";
export const endpoint = "https://api.devnet.solana.com";
export const connection = new Connection(endpoint, commitmentLevel);

export const programId = new PublicKey("DJecLubDCCV3KuQyw5Hg6Yf4UaA1GNdwt4TyFoJgo56b");
export const programInterface = JSON.parse(JSON.stringify(idl));

import json_secret from './wallet.json'
// const x = 'utils/mywallet/wallet.json';
// export const secret = fs.readFileSync(jsonFilePath, 'utf8');
export const secret = Uint8Array.from(json_secret);

// const y = 'utils/stake.json'
// export const stake = Uint8Array.from(JSON.parse(fs.readFileSync(y, 'utf8')));

// const z = 'utils/contracts_wallet.json'
// export const cw = Uint8Array.from(JSON.parse(fs.readFileSync(y, 'utf8')));
