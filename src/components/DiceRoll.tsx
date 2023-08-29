import React, { useState, useRef} from 'react';
import { gsap } from 'gsap';

const DiceRoll = ({ onDiceValueChange }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const animationRef = useRef(null);
  

  const rollDice = () => {
    if (!isRolling) {
      setIsRolling(true);

      // If there's an existing animation, clear it
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Reset the rotation to 0 before starting a new roll
      gsap.set('.dice', {
        rotation: 0,
      });

      // Create a GSAP timeline for the animation
      animationRef.current = gsap.timeline({
        onComplete: () => {
          setIsRolling(false);
          // After the initial animation, set the new dice value
          const newValue = Math.floor(Math.random() * 6) + 1;
          setDiceValue(newValue);
          onDiceValueChange(newValue);
          // Confirm the bet using the betAmount state
        },
      });

      // Simulate rolling the dice with a random animation
      animationRef.current
        .to('.dice', {
          duration: 1.5,
          y: -180,
          ease: 'power10.inOut',
        })
        .to('.dice', {
          duration: 0.5,
          y: 0,
          rotation: 360,
          ease: 'bounce.out',
        });
    }
  };

  const renderDots = () => {
    const dots = [];
    const dotPositions = {
      1: [{ left: '50%', top: '50%' }],
      2: [{ left: '30%', top: '30%' }, { left: '70%', top: '70%' }],
      3: [{ left: '30%', top: '30%' }, { left: '50%', top: '50%' }, { left: '70%', top: '70%' }],
      4: [
        { left: '30%', top: '30%' },
        { left: '30%', top: '70%' },
        { left: '70%', top: '30%' },
        { left: '70%', top: '70%' },
      ],
      5: [
        { left: '30%', top: '30%' },
        { left: '30%', top: '70%' },
        { left: '50%', top: '50%' },
        { left: '70%', top: '30%' },
        { left: '70%', top: '70%' },
      ],
      6: [
        { left: '30%', top: '30%' },
        { left: '30%', top: '50%' },
        { left: '30%', top: '70%' },
        { left: '70%', top: '30%' },
        { left: '70%', top: '50%' },
        { left: '70%', top: '70%' },
      ],
    };

    const positions = dotPositions[diceValue];

    if (positions) {
      positions.forEach((position, index) => {
        dots.push(
          <div
            className="dot"
            key={index}
            style={{ left: position.left, top: position.top }}
          ></div>
        );
      });
    }

    return dots;
  };

  return (
    <div className="dice-container">
      <div className={`dice ${isRolling ? 'rolling' : ''}`} onClick={rollDice}>
        {renderDots()}
        </div>
    </div>
  );
};

export default DiceRoll;
