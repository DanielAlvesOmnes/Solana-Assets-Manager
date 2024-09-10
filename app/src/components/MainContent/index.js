import React, { useState } from 'react';
import BalanceCard from '../Cards/Balance';
import SolanaAccountInfo from '../Cards/AccountInfo';
import TransferModal from '../Wallet/TransferModal';
import AirdropModal from '../Wallet/AirDropModal';

function MainContent() {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAirdropModalOpen, setIsAirdropModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center gap-20 space-x-6">
        <div className='flex items-center gap-6'>
          <div className="flex-shrink-0">
            <BalanceCard />
          </div>
          <div className="flex-grow">
            <SolanaAccountInfo />
          </div>
        </div>
        
        <div className="flex gap-6 flex-col">
          <button
            onClick={() => setIsAirdropModalOpen(true)}
            className="px-4 py-2 w-[200px] bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Airdrop
          </button>

          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="px-4 py-2 w-[200px] bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Transfer
          </button>
        </div>
      </div>

      
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
      />

      
      <AirdropModal
        isOpen={isAirdropModalOpen}
        onClose={() => setIsAirdropModalOpen(false)}
      />

    </div>
  );
}

export default MainContent;
