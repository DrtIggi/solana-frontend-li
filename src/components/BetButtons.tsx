// BetButtons.js
// BetButtons.js
import React, { useState } from 'react';
// import ReactSwitch from 'react-switch';

const BetButtons = ({ betAmounts, selected,onBetClick }) => {

  // const buttonClass = selected ? 'selected' : '';
  const [selectedButton, setSelectedButton] = useState(selected);

  const handleBetClick = (amount) => {
    // Update the selected button when clicked
    setSelectedButton(amount);
    onBetClick(amount);
  };
  return (
    <div>
        <div className="bet-buttons-row bet-buttons">
        {betAmounts.slice(0, 4).map((amount, index) => (
          <button
            key={index}
            onClick={() => handleBetClick(amount)}
            className={`button-33 ${selectedButton === amount ? 'button-33-selected' : ''}`}
          >
            {amount} SOL
          </button>
        ))}
      </div>
      <div className="bet-buttons-row bet-buttons">
        {betAmounts.slice(4, 8).map((amount, index) => (
          <button
            key={index}
            onClick={() => handleBetClick(amount)}
            className={`button-33 ${selectedButton === amount ? 'button-33-selected' : ''}`}
          >
            {amount} SOL
          </button>
        ))}
      </div>
    </div>
  );
};

export default BetButtons;
