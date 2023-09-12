import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import WinNotification from 'components/WinNotification';
import DiceRoll from '../components/DiceRoll';
import BetInput from '../components/BetInput'
import BetButtons from 'components/BetButtons';
import BetSlider from 'components/BetSlider'
import RangeSlider from 'react-range-slider-input';
import CoinFlip from 'components/CoinFlip';
import 'react-range-slider-input/dist/style.css';
import $ from 'jquery';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');
require('../styles/coinflip.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {


  const [showDiceRoll, setShowDiceRoll] = useState(true);
  const [diceValue, setDiceValue] = useState(1);
  const [inputValue, setInputValue] = useState(0);

  const handleSwitchComponent = () => {
    setShowDiceRoll((prevShowDiceRoll) => !prevShowDiceRoll);
  };

  const handleDiceValueChange = (newValue) => {
    setDiceValue(newValue);
  };
  const handleInputValueChange = (newValue) => {
    setInputValue(newValue);
  }
  return (
    <>
      <Head>
        <title>Kaka i PIPI</title>
      </Head>
      <ContextProvider>
        <div className="flex flex-col h-screen">
          {/* <Notifications /> */}
          <AppBar />
          {/* <ContentContainer> */}
          {/* <Component {...pageProps} /> */}
          {/* <Footer/> */}
          {/* </ContentContainer> */}
          
          {/* <WinNotification inputValue={inputValue} diceValue={diceValue} /> */}
          
      <div className={`dice-container`}>
        <div className='round-button' onClick={handleSwitchComponent}>{"<"}</div>
        {showDiceRoll? <DiceRoll onChange={[handleDiceValueChange, inputValue]} /> : <CoinFlip onChange={[handleDiceValueChange, inputValue]}/>}
        <div className='round-button' onClick={handleSwitchComponent}>{">"}</div>
      </div>
   

          <div className="cool-text">
            Choose your warrior...
          </div>
          {/* <button className="button-33" role="button">Button 33</button> */}
          {/* <RangeSlider onInput={handleInputValueChange}/> */}
          {/* <BetSlider onBetChange={setInputValue} /> */}
          <BetButtons betAmounts={[0.1, 0.3, 0.5, 1, 1.3, 1.5, 1.7, 2]} onBetClick={setInputValue} />
          {/* <BetInput onInputValueChange={handleInputValueChange} /> */}
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
          <div className={` ${diceValue > 3 ? 'confetti' : ''}`}></div>
        </div>
      </ContextProvider>

      
    </>
  );
  
};
{/* <DiceRoll/> */}
export default App;