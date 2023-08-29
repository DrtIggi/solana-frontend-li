import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useState } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import DiceRoll from '../components/DiceRoll'
import BetInput from 'components/BetInput';
import WinNotification from 'components/WinNotification'
import Recent from 'components/Recent'
// import { ContentContainer } from '../components/ContentContainer';
// import { Footer } from '../components/Footer';
// import Notifications from '../components/Notification'
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [inputValue, setInputValue] = useState(0);

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
              <AppBar/>
              {/* <ContentContainer> */}
                {/* <Component {...pageProps} /> */}
                {/* <Footer/> */}
              {/* </ContentContainer> */}
              <WinNotification inputValue={inputValue} diceValue={diceValue} />
              <DiceRoll onDiceValueChange={handleDiceValueChange}/>
              <BetInput onInputValueChange={handleInputValueChange}/>
            </div>
          </ContextProvider>
              
              
        </>
    );
};
{/* <DiceRoll/> */}
export default App;