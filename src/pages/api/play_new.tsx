// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
// import {Wallet} from "@project-serum/anchor"
import {
    connection,
    commitmentLevel,
    programId,
    programInterface,
    secret
  } from "./constants";
// const programId = "2WWFGRA4f81ubcjtkh112obV8brzF6nkhBCDGh7Z8hqo";
import { clusterApiUrl } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

export default async function play(player, value: number) {


    const preflightCommitment = "processed";
    const commitment = "processed";
    const vendor = anchor.web3.Keypair.fromSecretKey(secret)

    const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(vendor), {
        preflightCommitment,
        commitment,
        });
    const program = new anchor.Program(programInterface, programId, provider);


    const [dicePDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
    [
        anchor.utils.bytes.utf8.encode("dice-roll"),
        vendor.publicKey.toBuffer(),
        player.publicKey.toBuffer(),
    ],
    program.programId
    );

    // const playerChoice = 1;
    // const randomSeed = new anchor.BN(Math.floor(Math.random() * 100000));
    // console.log(dicePDA);
    
    // let roll_number = new anchor.BN(Math.floor(Math.random() * 6));
    let roll_number = new anchor.BN(value); //TODO: argument
    // console.log(roll_number);
    const tx = await program.methods.play(roll_number)
      .accounts({
        diceRoll: dicePDA,
        vendor: vendor.publicKey,
        player: player.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
    //   .signers(player instanceof (anchor.Wallet as any) ? [] : [player])
      // .signers([player, vendor])
    .rpc();
  
    // const gameState = await program.account.diceRoll.fetch(dicePDA);
    console.log("player: ", player.publicKey.toString());
    // console.log("Winner:", gameState.state.finished.winner.toString());
    // console.log({ gameState: gameState.players });
    console.log(tx.toString());
  }

  // const player = new anchor.Wallet(anchor.web3.Keypair.fromSecretKey(stake))
  // let playerPublicKey = new PublicKey(player.publicKey);

  // const vendor = anchor.web3.Keypair.fromSecretKey(secret);
  // const vendorWallet = new anchor.Wallet(vendor);
  // play(null, 5);

