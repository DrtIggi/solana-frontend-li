// WinNotification.js

import React from 'react';

const WinNotification = ({ inputValue, diceValue }) => {
  // Calculate the total win based on inputValue and diceValue
  let totalWin = 0
    if(diceValue == 6){
        totalWin = inputValue * 2;
    }
    else if(diceValue == 5){
        totalWin = inputValue * 1.7;
    }
    else if(diceValue == 4){
        totalWin = inputValue * 1.3;
    }
    else if(diceValue == 3){
        totalWin = inputValue * 0.3;
    }
    else if(diceValue == 2){
        totalWin = inputValue * 0.7;
    }
    else{
        totalWin = inputValue * 1;
    }
  // Determine if the user has won
  const hasWon = diceValue == 4 || diceValue == 5 || diceValue == 6 ;

  // Define a CSS class for the transition
  const notificationClass = `notification${hasWon ? ' win' : ' lose'}`;
  return (
    <div className={notificationClass}>
      {hasWon ? `Congratulations! You've won ${totalWin - inputValue} tokens.` : `Sorry, you lost ${totalWin} tokens.`}
    </div>
  );
};

export default WinNotification;
