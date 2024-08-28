import React, { useState } from 'react';

function Header() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const newPublicKey = e.target.value;
    setInputValue(newPublicKey);
  };

  const handleButtonClick = () => {
    localStorage.setItem('userPublicKey', inputValue);
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <div>
          <input
            type="text"
            placeholder="Enter your public key"
            value={inputValue}
            onChange={handleInputChange}
            className="text-black ml-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            onClick={handleButtonClick}
            className="ml-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-green-400 rounded-lg hover:bg-green-300"
          >
            Run 
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
