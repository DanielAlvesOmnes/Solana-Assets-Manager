import React from 'react';
import { useWallet } from '../../context/ContextWallet';
import { clusterApiUrl } from '@solana/web3.js';
import Link from 'next/link';

function Navbar() {
  const { netCluster, updateNetCluster } = useWallet();

  const handleNetworkChange = (event) => {
    const network = event.target.value;

    switch (network) {
      case 'MainNet':
        updateNetCluster(clusterApiUrl('mainnet-beta'));
        break;
      case 'DevNet':
        updateNetCluster(clusterApiUrl('devnet'));
        break;
      case 'TestNet':
        updateNetCluster(clusterApiUrl('testnet'));
        break;
      case 'LocalNet':
        updateNetCluster('http://127.0.0.1:8899');
        break;
      default:
        updateNetCluster(clusterApiUrl('mainnet-beta'));
    }
  };

  const getCurrentNetwork = () => {
    switch (netCluster) {
      case clusterApiUrl('mainnet-beta'):
        return 'MainNet';
      case clusterApiUrl('devnet'):
        return 'DevNet';
      case clusterApiUrl('testnet'):
        return 'TestNet';
      case 'http://127.0.0.1:8899':
        return 'LocalNet';
      default:
        return 'MainNet';
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex items-center gap-4">
            <h1 className="text-white">CryptoBug</h1>
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div>
          
          <div className="flex-grow flex gap-14 items-center justify-center space-x-4">
            <Link href="/" passHref>
              <div className="text-white hover:text-gray-300">Home</div>
            </Link>
            <Link href="/mint-account" passHref>
              <div className="text-white hover:text-gray-300">Mint</div>
            </Link>
          </div>
          
          <div className="ml-auto">
            <select
              value={getCurrentNetwork()}
              onChange={handleNetworkChange}
              className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm"
            >
              <option value="MainNet">MainNet</option>
              <option value="DevNet">DevNet</option>
              <option value="TestNet">TestNet</option>
              <option value="LocalNet">LocalNet</option>
            </select>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
