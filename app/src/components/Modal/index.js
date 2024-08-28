// src/components/Modal.js
import React from 'react';
import { Keypair } from '@solana/web3.js';

function Modal({ isOpen, onClose, title }) {
  if (!isOpen) return null;

  const keypair = Keypair.generate();
  const publicKey = keypair.publicKey.toBase58();
  const secretKey = Array.from(keypair.secretKey).join(', ');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => console.log('Copied to clipboard!'),
      (err) => console.error('Failed to copy text: ', err)
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Public Key:</label>
            <textarea
              readOnly
              value={publicKey}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 resize-none"
              rows="2"
            />
            <button
              onClick={() => handleCopy(publicKey)}
              className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Copy
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Secret Key:</label>
            <textarea
              readOnly
              value={secretKey}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 resize-none"
              rows="6"
            />
            <button
              onClick={() => handleCopy(secretKey)}
              className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
