"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState('');
  const [netCluster, setNetCluster] = useState('');
  const [walletChange, setWalletChange] = useState(false);

  const updatePublicKey = (newKey) => {
    setPublicKey(newKey);
  };

  const updateNetCluster = (cluster) => {
    setNetCluster(cluster)
  }

  const isWalletChange = () => {
    setWalletChange(true);
  }

  return (
    <WalletContext.Provider 
      value={{ 
        publicKey, 
        updatePublicKey, 
        netCluster, 
        updateNetCluster, 
        walletChange, 
        isWalletChange 
        }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
