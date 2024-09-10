import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@/app/src/context/ContextWallet';

const TransferModal = ({ isOpen, onClose }) => {
  const { publicKey, netCluster, isWalletChange } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!publicKey || !window.solana) {
      setError('Public key or Phantom wallet not found!');
      return;
    }

    try {
      const senderPublicKey = new PublicKey(publicKey);
      const recipientPublicKey = new PublicKey(recipient);
      const connection = new Connection(netCluster, 'confirmed');
      const { blockhash } = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: senderPublicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: recipientPublicKey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      const signedTransaction = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), { skipPreflight: false });
      await connection.confirmTransaction(signature);

      setSuccess(`Transaction successful!<br/><br/>Signature: ${signature}`);
      isWalletChange()
    } catch (err) {
      console.error('Error during transfer:', err);
      setError('Transfer failed. Check the console for details.');
    }
  };

  const handleClose = () => {
    setRecipient('');
    setAmount('');
    setError('');
    setSuccess('');
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="text-black fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
      <div
        className="bg-white rounded-lg shadow-lg w-96 p-6 relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Transfer SOL</h2>
        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount (SOL)</label>
            <input
              type="number"
              step="0.00000001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Transfer
          </button>
        </form>
        <div className="mt-4">
          {error && <p className="text-red-500 break-words">{error}</p>}
          {success && <p className="text-green-500 break-words" dangerouslySetInnerHTML={{ __html: success }}></p>}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TransferModal;
