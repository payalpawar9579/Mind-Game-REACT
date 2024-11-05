import React, { useState, useEffect } from 'react';
import ThreeBackground from './ThreeBackground';
import './Game.css';

const Game = () => {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("Press 'Start Game' to begin the magic!");
  const [randomEvenNumber, setRandomEvenNumber] = useState(10);
  const [answer, setAnswer] = useState(5);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isSpeaking, setIsSpeaking] = useState(false);  // <-- Add this line
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  const initializeGame = () => {
    const evenNumber = Math.floor(Math.random() * 10) * 2 + 2;
    setRandomEvenNumber(evenNumber);
    setAnswer(evenNumber / 2);
  };

  const startGame = () => {
    setStep(1);
    setMessage("Think of a number in your mind, and let’s do some magic with it!");
    setTimeLeft(300);
    initializeGame();
  };

  useEffect(() => {
    if (timeLeft > 0 && step > 0 && step <= 5) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setMessage("Time's up! Please restart the game.");
      setStep(0);
    }
  }, [timeLeft, step]);

  // Function to read the message aloud and highlight current word
  const readMessageAloud = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.pitch = 1;
    speech.rate = 0.8; // Slower reading speed

    // Start highlighting when speech starts
    speech.onstart = () => {
      setIsSpeaking(true);
    };
    
    // Highlight each word as it is spoken
    speech.onboundary = (event) => {
      if (event.name === 'word') {
        const words = text.split(" ");
        // Calculate the index of the current word
        const currentIndex = words.join(" ").substring(0, event.charIndex).split(" ").length - 1;
        setCurrentWordIndex(currentIndex);
      }
    };

    // Stop highlighting when speech ends
    speech.onend = () => {
      setIsSpeaking(false);
      setCurrentWordIndex(-1); // Reset the word index
    };

    window.speechSynthesis.speak(speech);
  };

  // Trigger reading message aloud whenever the message changes, except the initial message
  useEffect(() => {
    if (message && step > 0) { // Skip audio for initial message
      readMessageAloud(message);
    }
  }, [message, step]);

  const nextStep = () => {
    switch (step) {
      case 1:
        setMessage("Step 1: Multiply your number by 2.");
        break;
      case 2:
        setMessage(`Step 2: Add ${randomEvenNumber} to the result.`);
        break;
      case 3:
        setMessage("Step 3: Divide the result by 2.");
        break;
      case 4:
        setMessage("Step 4: Now, subtract your original number from the result.");
        break;
      case 5:
        setMessage(`The answer is... ${answer}! Isn’t it magic?`);
        break;
      default:
        setMessage("Think of a number in your mind, and let’s do some magic with it!");
        setStep(1);
        return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetGame = () => {
    setStep(0);
    setMessage("Press 'Start Game' to begin the magic!");
    setTimeLeft(300);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Three.js Stereo Background */}
      <ThreeBackground />

      {/* Main Game Content */}
      <div className="flex flex-col items-center justify-center p-6 text-white relative z-10 bg-black bg-opacity-90 rounded-lg max-w-2xl shadow-2xl">
        <h1 className="text-5xl font-bold mb-8 text-yellow-300">Magic Number Guess</h1>
        <p className="text-2xl font-medium mb-8">
          {message.split(" ").map((word, index) => (
            <span key={index} className={currentWordIndex === index ? 'text-violet-500 font-bold' : ''}>
              {word}{' '}
            </span>
          ))}
        </p>

        {step > 0 && step <= 5 && (
          <p className="text-2xl font-semibold text-red-500 mb-8">Time Left: {formatTime(timeLeft)}</p>
        )}

        {step === 0 ? (
          <button
            onClick={startGame}
            className="game-button bg-green-500 text-2xl text-white font-semibold rounded-lg"
          >
            Start Game
          </button>
        ) : (
          <div className={`flex ${step > 1 ? 'justify-between w-full' : 'justify-center'} max-w-lg mt-8`}>
            {step > 1 && (
              <button
                onClick={prevStep}
                className="game-button bg-purple-500 text-2xl text-white font-semibold rounded-lg"
              >
                Back
              </button>
            )}
            {step <= 5 ? (
              <button
                onClick={nextStep}
                className="game-button bg-yellow-400 text-2xl text-gray-800 font-semibold rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="game-button bg-green-600 text-2xl text-white font-semibold rounded-lg"
              >
                Restart
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
