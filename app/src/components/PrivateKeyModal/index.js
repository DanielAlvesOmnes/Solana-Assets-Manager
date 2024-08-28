import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';

function Modal({ isOpen, onClose, onSubmit }) {
  const [secretKeyString, setSecretKeyString] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    try {
      const secretKeyArray = secretKeyString
        .split(',')
        .map(num => parseInt(num.trim(), 10));
      if (secretKeyArray.length !== 64) {
        throw new Error('Invalid key size. Secret key must be 64 bytes.');
      }
      const secretKey = new Uint8Array(secretKeyArray);
      const keypair = Keypair.fromSecretKey(secretKey);
      console.log('batata2', keypair)

      onSubmit(keypair);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Enter Secret Key</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <textarea
          rows="4"
          value={secretKeyString}
          onChange={(e) => setSecretKeyString(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your secret key as a comma-separated list"
        />
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Modal;
