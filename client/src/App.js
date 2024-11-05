// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer'; // Import Footer component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header /> {/* Consistent header for navigation */}
        
        <div className="content flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        
        <Footer /> {/* Add Footer at the bottom */}
      </div>
    </Router>
  );
};

export default App;
