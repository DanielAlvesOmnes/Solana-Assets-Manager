// src/components/Footer.js
import React from 'react';

function Footer({ onButtonClick }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4">
      <div className="flex justify-center">
        <button
          onClick={onButtonClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Generate Key Pair
        </button>
      </div>
    </footer>
  );
}

export default Footer;
