import React, { useState } from 'react';

const BetInput = ({ onInputValueChange }) => {
  const [betAmount, setBetAmount] = useState('');

  const handleBetChange = (event) => {
    // Update the betAmount state when the input value changes
    setBetAmount(event.target.value);
    onInputValueChange(event.target.value);
  };

  const handleConstantAmountClick = (amount) => {
    // Set the betAmount when a constant amount is clicked
    setBetAmount(amount.toString());
    onInputValueChange(amount.toString());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can use the betAmount state here for further processing, like sending it to a server or updating other parts of your app.
    console.log('Bet Amount:', betAmount);
  };

  return (
    <div className="input-container"> {/* Use className instead of style */}
      <form onSubmit={handleSubmit}>
        {/* <label>
          <input
            type="number"
            value={betAmount}
            onChange={handleBetChange}
            className="input"
            step="0.01"
          />{' '}
          in SOL
        </label> */}
        <p className="instruction-text">Or you can use the following buttons:</p>
        <div className="button-container">
          <div className="constant-amounts left-constants">
            <button onClick={() => handleConstantAmountClick(0.1)}>0.1</button>
            <button onClick={() => handleConstantAmountClick(0.2)}>0.2</button>
            <button onClick={() => handleConstantAmountClick(0.5)}>0.5</button>
            <button onClick={() => handleConstantAmountClick(1)}>1</button>
          </div>
          <div className="constant-amounts right-constants">
            <button onClick={() => handleConstantAmountClick(1.2)}>1.2</button>
            <button onClick={() => handleConstantAmountClick(1.5)}>1.5</button>
            <button onClick={() => handleConstantAmountClick(1.7)}>1.7</button>
            <button onClick={() => handleConstantAmountClick(2)}>2</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BetInput;
