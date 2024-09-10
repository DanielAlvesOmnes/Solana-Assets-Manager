import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useWallet } from '@/app/src/context/ContextWallet';

const BalanceCard = () => {
  const { publicKey, netCluster, walletChange } = useWallet()

  const [balance, setBalance] = useState(0);
  const [solPrice, setSolPrice] = useState(0);

  useEffect(() => {
    async function getBalance () {
      try {

        if(publicKey){
          const connection = new Connection(netCluster, 'confirmed');
          const pubKeyHash = new PublicKey(publicKey);
          const balance = await connection.getBalance(pubKeyHash);
          const solBalance = balance / LAMPORTS_PER_SOL;
          setBalance(solBalance);
        } else {
          setBalance(0);
        }
        
      } catch (error) {
        
        console.error('Error getting balance:', error);
      }
    }

    getBalance();
  }, [publicKey, netCluster, walletChange]);

  useEffect(() => {
    async function fetchSolPrice() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        setSolPrice(data.solana.usd);
      } catch (error) {
        console.error('Error fetching SOL price:', error);
      }
    }

    fetchSolPrice();
  }, []);

  const balanceInUSD = balance * solPrice;

  const trimmedPublicKey = publicKey
    ? `${publicKey.slice(0, 5)}...${publicKey.slice(-5)}`
    : 'Not Connected';

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
          <p className="text-gray-400 text-sm">Account: {trimmedPublicKey}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-4xl font-bold text-white">{balance?.toFixed(5)} SOL</p>
        <p className="text-lg text-gray-400">${balanceInUSD?.toFixed(2)} USD</p>
      </div>

      <div className="mt-4">
        <a target="_blank" href={`https://explorer.solana.com/address/${publicKey}?cluster=devnet`}>
          <button className="w-full px-4 py-2 text-sm font-semibold text-gray-800 bg-yellow-400 rounded-lg hover:bg-yellow-300">
            View Transactions
          </button>
        </a>
        
      </div>
    </div>
  );
}

export default BalanceCard;
