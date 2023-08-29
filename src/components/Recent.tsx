import React, { useState } from 'react';

const Recent = () => {
  const [showRecentBets, setShowRecentBets] = useState(false);
  const recentBets = [
    { id: 1, amount: 10, result: 'win' },
    { id: 2, amount: 20, result: 'lose' },
    { id: 3, amount: 5, result: 'win' },
    // Add more recent bets here
  ];

  const toggleRecentBets = () => {
    setShowRecentBets(!showRecentBets);
  };

  return (
    <div>
      <button onClick={toggleRecentBets}>Recent Bets</button>
      {showRecentBets && (
        <div>
          <ul>
            {recentBets.map((bet) => (
              <li key={bet.id}>
                Bet Amount: {bet.amount}, Result: {bet.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recent;
