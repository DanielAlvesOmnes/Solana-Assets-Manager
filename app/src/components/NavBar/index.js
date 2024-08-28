import React, { useState, useEffect } from 'react';

function Navbar() {

  const [pubKey, setPubKey] = useState('');

  useEffect(() => {
    setPubKey(window?.localStorage?.getItem('userPublicKey'));
  }, [pubKey])

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  CryptoBug
                </a>
              </div>
            </div>


            <div className="ml-[100px]">
              <h1>Pub Key: {pubKey} 
                <button 
                  onClick={() => {
                    window?.localStorage?.removeItem("userPublicKey")
                    setPubKey('');
                  }}
                  className="ml-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-red-400 rounded-lg hover:bg-red-300"
                >Clear 
                </button>
              </h1>
              
            </div>
            


          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
