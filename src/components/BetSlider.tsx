// BetSlider.js
import React, { useState } from 'react';

const BetSlider = ({onBetChange }) => {
 const [selectedBet, setSelectedBet] = useState(null);

  const handleSliderChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setSelectedBet(newValue);
    onBetChange(newValue);
  };

  return (
    <div className="bet-slider">
      <input
        type="range"
        min={0.1}
        max={2}
        step={0.1} // Adjust the step value as needed
        value={selectedBet}
        onChange={handleSliderChange}
      />
      <span>{selectedBet} SOL</span>
    </div>
  );
};

export default BetSlider;
