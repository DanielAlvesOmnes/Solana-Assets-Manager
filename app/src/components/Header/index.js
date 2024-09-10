import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useWallet } from '../../context/ContextWallet';

function Header() {
  const { updatePublicKey } = useWallet();
  const [walletPublicKey, setWalletPublicKey] = useState(null);

  const connectWallet = async () => {
    if (window.solana) {
      try {
        const response = await window.solana.connect();
        const publicKey = new PublicKey(response.publicKey.toString()); 
        setWalletPublicKey(publicKey);
        updatePublicKey(response.publicKey.toString());
      } catch (err) {
        console.error('Wallet connection error:', err);
        alert('Failed to connect to wallet.');
      }
    } else {
      alert('Phantom wallet not found!');
    }
  };

  const disconnectWallet = async () => {
    if (window.solana && window.solana.disconnect) {
      try {
        await window.solana.disconnect();
        setWalletPublicKey(null);
        updatePublicKey(null);
      } catch (err) {
        console.error('Wallet disconnection error:', err);
        alert('Failed to disconnect from wallet.');
      }
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.solana && window.solana.isConnected) {
        try {
          const publicKey = await window.solana.publicKey;
          setWalletPublicKey(new PublicKey(publicKey.toString()));
          updatePublicKey(publicKey.toString());
        } catch (err) {
          console.error('Failed to fetch wallet public key:', err);
        }
      }
    };
    
    checkConnection();
  }, [updatePublicKey]);

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <div>
          {walletPublicKey ? (
            <div className="flex items-center">
              <p className="text-green-500 mr-4">Connected Wallet: {walletPublicKey.toString()}</p>
              <button
                onClick={disconnectWallet}
                className="ml-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-red-500 rounded-lg hover:bg-red-400"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="ml-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-blue-500 rounded-lg hover:bg-blue-400"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
