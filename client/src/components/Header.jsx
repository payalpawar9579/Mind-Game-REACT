// Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex items-center justify-center w-full py-4 bg-black bg-opacity-90 text-white sticky top-0 z-50 shadow-2xl"
         style={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
      
      <div className="flex space-x-20 px-8">
        <Link to="/home" className="text-lg font-medium hover:text-yellow-400 transition-transform duration-300 transform hover:scale-110">Home</Link>
        <Link to="/game" className="text-lg font-medium hover:text-yellow-400 transition-transform duration-300 transform hover:scale-110">Game</Link>
        <Link to="/about" className="text-lg font-medium hover:text-yellow-400 transition-transform duration-300 transform hover:scale-110">About</Link>
      </div>
    </nav>
  );
};

export default Header;
