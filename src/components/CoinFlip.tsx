import React, { useState, useRef, useEffect } from 'react';
import { play } from "pages/api/play_new";
import { setup } from "pages/api/setup_new";
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import LoadingAnimation from './LoadingAnimation';

function CoinFlip({ onChange }) {
  const [onDiceValueChange, inputValue] = onChange;
  const [isHeads, setIsHeads] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const anchorWallet = useAnchorWallet();
  const coinRef = useRef(null);

  const flipCoin = async () => {
    // Toggle the state to switch between heads and tails
    setIsLoading(true);
    const randomInteger = Math.round(Math.random());
    await _play(randomInteger, inputValue);
    setIsHeads(randomInteger === 1 ? true : false);
    setIsLoading(false);
    onDiceValueChange(randomInteger === 1 ? 6 : 1);

    // Call onAnimationEnd after the animation is completed
    onAnimationEnd();
  };

  const onAnimationEnd = () => {
    // Your code to execute after the animation ends
    console.log('Animation ended');
  };

  async function _play(newValue, inputValue) {
    setIsLoading(true);

    try {
      await setup(anchorWallet, LAMPORTS_PER_SOL * inputValue);
      await play(anchorWallet, newValue ? 6 : 1);
    } catch (error) {
      // Handle errors if needed
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (coinRef.current) {
      coinRef.current.addEventListener('animationend', onAnimationEnd);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (coinRef.current) {
        coinRef.current.removeEventListener('animationend', onAnimationEnd);
      }
    };
  }, []);

  return (
    <div className='coin-container'>
      {isLoading ? (
        <div id="coin" ref={coinRef} className="loading-animation-container">
          <LoadingAnimation />
          <div className="side-a"></div>
          <div className="side-b"></div>
        </div>
      ) : (
        <div
          id="coin"
          ref={coinRef}
          className={isHeads ? 'heads' : 'tails'}
          onClick={flipCoin}
        >
          <div className="side-a"></div>
          <div className="side-b"></div>
        </div>
      )}
    </div>
  );
}

export default CoinFlip;

