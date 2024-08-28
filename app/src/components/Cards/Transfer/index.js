import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import Modal from '../../PrivateKeyModal'; // Import your Modal component

const Transfer = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [publicKeyString, setpublicKeyString] = useState('');

  useEffect(() => {
    setpublicKeyString(window?.localStorage?.getItem('userPublicKey'));
  }, []);

  const handleTransfer = async (keypair) => {

    try {
      console.log('PublicKey:', publicKeyString);
      console.log('Recipient:', recipient);
      console.log('Amount:', amount);
      console.log('Keypair:', keypair);
      
      const senderPublicKey = new PublicKey(publicKeyString);
      const recipientPublicKey = new PublicKey(recipient);
      const connection = new Connection('http://127.0.0.1:8899', 'confirmed');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPublicKey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );
      
      const signature = await connection.sendTransaction(transaction, [keypair]);
      await connection.confirmTransaction(signature);
      console.log('Transaction successful:', signature);
    } catch (error) {
      console.error('Error during transfer:', error);
    }
  };

  const handleSubmitFromModal = (keypair) => {
    handleTransfer(keypair); // Call the handleTransfer function when the modal form is submitted
    setShowModal(false); // Close the modal after submitting
  };

  return (
    <div className="max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4">Transfer SOL</h2>
      <div className="mb-4">
        <label htmlFor="recipient" className="block text-gray-400">Recipient Public Key:</label>
        <input
          type="text"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-400">Amount (SOL):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Transfer
      </button>
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(keypair) => {
            console.log('caralohohohohh', keypair)
            handleSubmitFromModal(keypair); // Call handleSubmitFromModal to execute transfer
          }}
        />
      )}
    </div>
  );
};

export default Transfer;
