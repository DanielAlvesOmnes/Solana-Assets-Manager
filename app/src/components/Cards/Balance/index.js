import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

const BalanceCard = () => {

  const [balance, setBalance] = useState(0);
  // const publicKeyString = "Ex5ok9zBcNqTjtgQwU9Uch2cH6rK4CXB4Y1vQYDsBD2s";
  const [publicKeyString, setpublicKeyString] = useState('');

  useEffect(() => {
    setpublicKeyString(window?.localStorage?.getItem('userPublicKey'));
  }, [])

  useEffect(() => {
    async function getBalance () {
      try {
        // const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
        const publicKey = new PublicKey(publicKeyString);
        const balance = await connection.getBalance(publicKey);
        const solBalance = balance / LAMPORTS_PER_SOL;
        setBalance(solBalance);
      } catch (error) {
        console.error('Error getting balance:', error);
      }
    }

    getBalance();
  }, [publicKeyString]);

  return (
    <div className="max-w-sm bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src="https://cryptologos.cc/logos/solana-sol-logo.png?v=024"
          alt="Solana Logo"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-white">Solana Balance</h2>
          <p className="text-gray-400 text-sm">Account: Ex5ok9zBc...</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-bold text-white">{balance?.toFixed(5)} SOL</p>
        <p className="text-lg text-gray-400">$320.45 USD</p>
      </div>

      <div className="mt-4">
        <a target="_blank" href={`https://explorer.solana.com/address/${publicKeyString}?cluster=devnet`}>
          <button className="w-full px-4 py-2 text-sm font-semibold text-gray-800 bg-yellow-400 rounded-lg hover:bg-yellow-300">
            View Transactions
          </button>
        </a>
        
      </div>
    </div>
  );
}

export default BalanceCard;
