// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full py-1 bg-black bg-opacity-90 text-white fixed bottom-0 z-10 shadow-2xl">
      <p className="flex items-center justify-center text-sm font-medium space-x-2">
        <span>Created by @Payal Pawar</span>
        <span>|</span>
        <a 
          href="https://www.instagram.com/payal_pixelize/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center hover:text-yellow-400"
        >
          Instagram
        </a>
        <span>|</span>
        <a 
          href="https://www.linkedin.com/in/payal-pawar-357243288/?trk=public-profile-join-page" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center hover:text-yellow-400"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
