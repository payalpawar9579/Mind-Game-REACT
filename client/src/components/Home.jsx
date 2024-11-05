// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeBackground from './ThreeBackground'; // Import the Three.js background component
import '../App.css'; // Import animations and styles

const Home = () => {
  const navigate = useNavigate();

  const startGame = () => {
    console.log('Navigating to /game');
    navigate('/game');
  };

  const goToAbout = () => {
    console.log('Navigating to /about');
    navigate('/about');
  };

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-1">
      {/* Three.js Stereo Background */}
      <ThreeBackground />

      {/* Semi-transparent overlay */}
      <div className="bg-overlay absolute top-0 left-0 w-full h-full"></div>

      {/* Main content box */}
      <div className="relative z-10 max-w-3xl w-full bg-black bg-opacity-90 rounded-lg p-16 shadow-2xl text-center transform scale-110">
        <div className="mb-10 flex items-center justify-center animate-fade-in">
          {/* Flex container for the title */}
          <h1 className="text-6xl font-extrabold">
            <span className="text-cyan-500">Mind </span>
            <span className="text-yellow-300"> Game</span>
          </h1>
        </div>

        {/* Buttons for Start and About */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 animate-fade-in delay-200">
          <button
            onClick={startGame}
            className="game-button px-8 py-4 bg-yellow-400 text-gray-800 font-semibold text-xl rounded-lg shadow-lg"
          >
            Start Playing
          </button>

          <button
            onClick={goToAbout}
            className="game-button px-8 py-4 bg-cyan-500 text-white font-semibold text-xl rounded-lg shadow-lg"
          >
            How to Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
