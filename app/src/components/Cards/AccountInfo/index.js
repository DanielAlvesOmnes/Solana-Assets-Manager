import React, { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useWallet } from '@/app/src/context/ContextWallet';

const SolanaAccountInfo = () => {
  const { publicKey, netCluster } = useWallet();
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function fetchAccountInfo() {
      if (publicKey) {
        try {
          const connection = new Connection(netCluster, 'confirmed');
          const pubKeyHash = new PublicKey(publicKey);
          const accountInfo = await connection.getAccountInfo(pubKeyHash);

          if (accountInfo) {
            setAccountInfo({
              lamports: accountInfo.lamports,
              owner: accountInfo.owner.toBase58(),
              executable: accountInfo.executable,
              rentEpoch: accountInfo.rentEpoch,
            });
          }
        } catch (error) {
          console.error('Error fetching account info:', error);
        }
      }
    }

    fetchAccountInfo();
  }, [publicKey, netCluster]);

  const trimmedPublicKey = publicKey
    ? `${publicKey.slice(0, 5)}...${publicKey.slice(-5)}`
    : 'Not Connected';

  return (
    <div className="flex flex-col gap-4 text-sm text-gray-300 space-y-2">
      <p><strong className='text-[#2e70c1] text-[20px]'>Public Key:</strong> {trimmedPublicKey}</p>
      {accountInfo ? (
        <>
          <p><strong className='text-[#2e70c1] text-[20px]'>Lamports:</strong> {accountInfo.lamports}</p>
          <p><strong className='text-[#2e70c1] text-[20px]'>Owner:</strong> {accountInfo.owner}</p>
          <p><strong className='text-[#2e70c1] text-[20px]'>Executable:</strong> {accountInfo.executable ? 'Yes' : 'No'}</p>
          <p><strong className='text-[#2e70c1] text-[20px]'>Rent Epoch:</strong> {accountInfo.rentEpoch}</p>
        </>
      ) : (
        <p>Loading account data...</p>
      )}
    </div>
  );
};

export default SolanaAccountInfo;
