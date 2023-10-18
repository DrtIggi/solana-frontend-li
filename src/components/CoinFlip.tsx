import React, { useState, useRef, useEffect } from 'react';
import { play } from "pages/api/play_new";
import { setup } from "pages/api/setup_new";
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import LoadingAnimation from './LoadingAnimation';

function CoinFlip({ onChange }) {
  const [onDiceValueChange, inputValue] = onChange;
  const [isHeads, setIsHeads] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const anchorWallet = useAnchorWallet();
  const coinRef = useRef(null);

  const flipCoin = async () => {
    // Toggle the state to switch between heads and tails
    // setIsLoading(true);
    const randomInteger = Math.round(Math.random());
    setIsHeads(randomInteger?true:false)
    await _play(randomInteger, inputValue);
    setIsHeads(randomInteger?true:false)
    // setIsLoading(false);
    // onAnimationEnd()
};

  const onAnimationEnd = (isHeadss) => {
    // Your code to execute after the animation ends
    onDiceValueChange(isHeads?6:1)
    console.log("animationed endded: "+isHeadss)
  };

  async function _play(newValue, inputValue) {
    setIsLoading(true);

    try {
      await setup(anchorWallet, LAMPORTS_PER_SOL * inputValue);
      await play(anchorWallet, newValue ? 6 : 1);
    } catch (error) {
      // Handle errors if needed
    } finally {
        setIsHeads(newValue?true:false)
      setIsLoading(false);
    //   setIsHeads(newValue?false:true)
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
  }, [isHeads]);

  return (
    <div className='coin-container'>
      {isLoading ? (
        <div id="coin" className="loading-animation-container">
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
