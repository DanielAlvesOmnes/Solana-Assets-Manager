import React from 'react';
import BalanceCard from '../Cards/Balance';
import AirDrop from '../Cards/Airdrop';
import Transfer from '../Cards/Transfer';

function MainContent () {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 flex gap-6">
      <BalanceCard />
      <Transfer />
      <AirDrop />
    </div>
  );
}

export default MainContent;
