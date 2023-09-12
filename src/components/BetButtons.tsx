// BetButtons.js
// BetButtons.js

const BetButtons = ({ betAmounts, onBetClick }) => {
  
  return (
    <div>
        <div className="bet-buttons-row bet-buttons">
          {betAmounts.slice(0, 4).map((amount, index) => (
            <button
              key={index}
              onClick={() => onBetClick(amount)}
              className={"button-33"}
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

              className={"button-33"}
            >
              {amount} SOL
            </button>
          ))}
        </div>
    </div>
  );
};

export default BetButtons;
