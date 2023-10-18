// BetButtons.js
// BetButtons.js
import React, { useState } from 'react';
// import ReactSwitch from 'react-switch';

const BetButtons = ({ betAmounts, onBetClick }) => {

  // const buttonClass = selected ? 'selected' : '';

  return (
    <div>
        <div className="bet-buttons-row bet-buttons">
          {betAmounts.slice(0, 4).map((amount, index) => (
            <button
              key={index}
              onClick={() => onBetClick(amount)}
              className={"button-33 ${buttonClass}"}
            >
              {amount} SOL
            </button>
          ))}
        </div>
        <div className="bet-buttons-row bet-buttons">
          {betAmounts.slice(4, 8).map((amount, index) => (
            <button
              key={index}
              onClick={() => onBetClick(amount)}

              className={"button-33 ${buttonClass}"}
            >
              {amount} SOL
            </button>
          ))}
        </div>
    </div>
  );
};

export default BetButtons;
