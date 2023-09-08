import React, { useState, useRef} from 'react';
import { gsap } from 'gsap';
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import {play} from "pages/api/play_new"
import {setup} from "pages/api/setup_new"
// import { AnchorProvider, Provider, web3, Wallet } from '@project-serum/anchor';
// import { WalletAdapter } from '@solana/wallet-adapter-base';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
// import {secret} from "pages/api/constants"

const DiceRoll = ({ onDiceValueChange }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const animationRef = useRef(null);
  const {connection} = useConnection()
  const anchorWallet = useAnchorWallet()

  async function _play() {
    //const anchorWallet = new AnchorProvider(connection, wallet , {})
    // const anchorWallet = new Ancho
    // const vendor = web3.Keypair.fromSecretKey(secret)
    // const commitment = "processed";
    // const preflightCommitment = "processed";
    // const provider = new AnchorProvider(connection, new Wallet(vendor), {commitment, preflightCommitment})
    
    await setup(anchorWallet, LAMPORTS_PER_SOL/2)
    await play(anchorWallet, diceValue)
    
  }

  const rollDice = () => {
    if (!isRolling) {
      setIsRolling(true);
      _play();
      // If there's an existing animation, clear it
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Reset the rotation to 0 before starting a new roll
      gsap.set('.dice', {
        rotation: 0,
      });

      // Create a GSAP timeline for the animation
      animationRef.current = gsap.timeline({
        onComplete: () => {
          setIsRolling(false);
          // After the initial animation, set the new dice value
          const newValue = Math.floor(Math.random() * 6) + 1;
          setDiceValue(newValue);
          onDiceValueChange(newValue);
          // Confirm the bet using the betAmount state
        },
      });

      // Simulate rolling the dice with a random animation
      animationRef.current
        .to('.dice', {
          duration: 1.5,
          y: -180,
          ease: 'power10.inOut',
        })
        .to('.dice', {
          duration: 0.5,
          y: 0,
          rotation: 360,
          ease: 'bounce.out',
        });
    }
  };

  const renderDots = () => {
    const dots = [];
    const dotPositions = {
      1: [{ left: '50%', top: '50%' }],
      2: [{ left: '30%', top: '30%' }, { left: '70%', top: '70%' }],
      3: [{ left: '30%', top: '30%' }, { left: '50%', top: '50%' }, { left: '70%', top: '70%' }],
      4: [
        { left: '30%', top: '30%' },
        { left: '30%', top: '70%' },
        { left: '70%', top: '30%' },
        { left: '70%', top: '70%' },
      ],
      5: [
        { left: '30%', top: '30%' },
        { left: '30%', top: '70%' },
        { left: '50%', top: '50%' },
        { left: '70%', top: '30%' },
        { left: '70%', top: '70%' },
      ],
      6: [
        { left: '30%', top: '30%' },
        { left: '30%', top: '50%' },
        { left: '30%', top: '70%' },
        { left: '70%', top: '30%' },
        { left: '70%', top: '50%' },
        { left: '70%', top: '70%' },
      ],
    };

    const positions = dotPositions[diceValue];

    if (positions) {
      positions.forEach((position, index) => {
        dots.push(
          <div
            className="dot"
            key={index}
            style={{ left: position.left, top: position.top }}
          ></div>
        );
      });
    }

    return dots;
  };

  return (
    <div className="dice-container">
      <div className={`dice ${isRolling ? 'rolling' : ''}`} onClick={rollDice}>
        {renderDots()}
        </div>
    </div>
  );
};

export default DiceRoll;
