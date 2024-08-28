import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const AirDrop = () => {
  const [publicKeyString, setpublicKeyString] = useState('');

  useEffect(() => {
    setpublicKeyString(window?.localStorage?.getItem('userPublicKey'));
  }, [])

  // const publicKeyString = "Ex5ok9zBcNqTjtgQwU9Uch2cH6rK4CXB4Y1vQYDsBD2s";
  const [solAmount, setSolAmount] = useState(1); // Default to 1 SOL

  async function handleAirDrop() {
    try {
      const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
      const publicKey = new PublicKey(publicKeyString);
      const signature = await connection.requestAirdrop(publicKey, solAmount * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(signature);
      console.log(`${solAmount} SOL airdropped successfully!`);
    } catch (error) {
      console.error('Error during airdrop:', error);
    }
  }

  return (
    <div className="max-w-sm bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex gap-6 items-center">
        <img
          className="w-10 h-10 rounded-full"
          src="https://cryptologos.cc/logos/solana-sol-logo.png?v=024"
          alt="Solana Logo"
        />
        <h2 className="text-xl font-semibold text-white">AirDrop</h2>
      </div>

      <div className="mt-7">
        <label htmlFor="solAmount" className="block text-gray-400 mb-2">
          Enter SOL Amount:
        </label>
        <input
          type="number"
          id="solAmount"
          value={solAmount}
          onChange={(e) => setSolAmount(Number(e.target.value))}
          className="w-full px-3 py-2 text-gray-900 rounded-lg"
          min="0.1"
          step="0.1"
        />
      </div>

      <div className="mt-4">
        <button
          onClick={handleAirDrop}
          className="w-full px-4 py-2 text-sm font-semibold text-gray-800 bg-green-400 rounded-lg hover:bg-green-300"
        >
          AirDrop {solAmount} SOL
        </button>
      </div>
    </div>
  );
};

export default AirDrop;
