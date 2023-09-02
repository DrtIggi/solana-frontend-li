// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as anchor from "@project-serum/anchor";
// import * as idl from "../target/idl/dice.json";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
    connection,
    commitmentLevel,
    programId,
    programInterface,
    secret
  } from "./constants";
// const programId = "2WWFGRA4f81ubcjtkh112obV8brzF6nkhBCDGh7Z8hqo";
import { clusterApiUrl } from "@solana/web3.js";
import play from "./play_new";

// function programForUser(user: anchor.web3.Keypair) {
//     return new anchor.Program(program.idl, program.programId, user.provider);
// }

type Data = {
  dicePDA: string;
  vendor: string;
};

const preflightCommitment = "processed";
const commitment = "processed";

export default async function setup(player, amount: number
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
) {
//   let { playerPublicKey, amount } = JSON.parse(new PublicKey(""));
//   let playerPublicKey = "kaka";
  console.log(programId);

  // let amount = LAMPORTS_PER_SOL / 5
  // const player = anchor.web3.Keypair.fromSecretKey(stake)
  let playerPublicKey = new PublicKey(player.publicKey);
  // let playerPublicKey = new PublicKey("6KYkQiTgoenuB3CWga9VbjJdbMhv7wWrfXq97putTug3");
  amount = new anchor.BN(amount);

//   const { VENDOR_SECRET_KEY } = process.env;
//   if (!VENDOR_SECRET_KEY) return;

//   const secretKeyArray = Uint8Array.from(secret);
//   new Wallet(web3.Keypair.fromSecretKey(secret))
//   console.log(secretKeyArray);

  const vendor = anchor.web3.Keypair.fromSecretKey(secret);
  // const vendorWallet = new anchor.Wallet(vendor);

//   const connection = new Connection(
    // "https://explorer-api.devnet.solana.com/",
    // commitment
//   );
  const provider = new anchor.AnchorProvider(connection, player, {
    preflightCommitment,
    commitment,
  });

//   let sig = await provider.connection.requestAirdrop(
//     playerPublicKey,
//     1000000000000
//   );
//   await provider.connection.confirmTransaction(sig);
//   let sig2 = await provider.connection.requestAirdrop(
//     vendor.publicKey,
//     1000000000000
//   );

//   await provider.connection.confirmTransaction(sig2);

  // Start

  const program = new anchor.Program(programInterface, programId, provider)

  const randomSeed = new anchor.BN(Math.floor(Math.random() * 100000));

  const [dicePDA, _] = await anchor.web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode("dice-roll"),
      vendor.publicKey.toBuffer(),
      playerPublicKey.toBuffer(),
    ],
    program.programId
  );
  console.log(dicePDA);

  try {
    // delete if account exists
    
    await program.account.diceRoll.fetch(dicePDA); // should error out if account does not exist
    const deleteTx = await program.rpc.delete(playerPublicKey, {
      accounts: {
        diceRoll: dicePDA,
        vendor: vendor.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [vendor],
    });

    await provider.connection.confirmTransaction(deleteTx);
  } catch (error) {
    // console.log(error);
    console.log(program.account)
    console.log("account does not exist, continue");
  }

  const setupTx = await program.rpc.setup(vendor.publicKey, amount, {
    accounts: {
      diceRoll: dicePDA,
      player: player.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    signers: [player],
  });
  await provider.connection.confirmTransaction(setupTx);

//   res.status(200).json({
    // dicePDA: dicePDA.toString(),
    // vendor: vendor.publicKey.toString(),
//   });
  console.log(dicePDA.toString());
  console.log(vendor.publicKey.toString());
}

// setup();