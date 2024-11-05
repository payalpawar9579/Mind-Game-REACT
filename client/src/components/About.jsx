// About.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeBackground from './ThreeBackground'; // Import the Three.js background component

const About = () => {
  const navigate = useNavigate();

  const startPlaying = () => {
    navigate('/game'); // Redirects to the Game page
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-8">
      {/* 3D Background Component */}
      <ThreeBackground />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-white-800 opacity-20"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full bg-black bg-opacity-90 rounded-lg shadow-2xl p-12 flex flex-col items-center justify-center">
        <h1 className="text-center text-6xl font-extrabold text-yellow-300 mb-6">
          Think of a Number
        </h1>
        <p className="text-center text-xl text-white mb-12">
          Just think of any number in your mind. Ready to see the magic?
        </p>
        
        {/* Button to start playing */}
        <button
          onClick={startPlaying}
          className="px-8 py-4 bg-yellow-400 text-gray-800 font-semibold text-xl rounded-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
};

export default About;
