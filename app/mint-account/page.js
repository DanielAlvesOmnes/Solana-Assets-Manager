"use client";

import React, { useState } from 'react';
import { useWallet } from '../src/context/ContextWallet';
import { Connection, PublicKey, SystemProgram, Transaction, Keypair } from '@solana/web3.js';
import { 
  createInitializeMintInstruction, 
  TOKEN_PROGRAM_ID, 
  ASSOCIATED_TOKEN_PROGRAM_ID, 
  createAssociatedTokenAccountInstruction, 
  mintTo, 
  getMinimumBalanceForRentExemptMint, 
  getMint, 
  getAssociatedTokenAddress,
  Token
} from '@solana/spl-token';
import Navbar from '../src/components/NavBar';
import Header from '../src/components/Header';

const MintAccountPage = () => {
  const { publicKey, netCluster } = useWallet();
  const [mintAccountAddress, setMintAccountAddress] = useState('');
  const [inputMintAddress, setInputMintAddress] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mintData, setMintData] = useState(null);
  const [associatedTokenAddress, setAssociatedTokenAddress] = useState('');
  // const [mintAmount, setMintAmount] = useState(1);
  const [tokenAccounts, setTokenAccounts] = useState([]);


  const createMintAccount = async () => {
    if (!publicKey) {
      setStatusMessage('Public key not found!');
      return;
    }

    setLoading(true);
    setStatusMessage('');

    try {
      const connection = new Connection(netCluster, 'confirmed');
      const payerPublicKey = new PublicKey(publicKey);

      const mintAccount = Keypair.generate();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);
      const { blockhash } = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: payerPublicKey,
      }).add(
        SystemProgram.createAccount({
          fromPubkey: payerPublicKey,
          newAccountPubkey: mintAccount.publicKey,
          lamports,
          space: 82,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          mintAccount.publicKey,
          9,
          payerPublicKey,
          payerPublicKey,
          TOKEN_PROGRAM_ID
        )
      );

      transaction.partialSign(mintAccount);
      const signedTransaction = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), { skipPreflight: false });
      await connection.confirmTransaction(signature);

      setMintAccountAddress(mintAccount.publicKey.toBase58());
      setStatusMessage(`Mint account created with signature: ${signature}`);
    } catch (err) {
      console.error('Error creating mint account:', err);
      setStatusMessage('Failed to create mint account. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  const loadMintAccount = async () => {
    if (!inputMintAddress) {
      setStatusMessage('Please enter a mint account public key!');
      return;
    }

    setLoading(true);
    setStatusMessage('');

    try {
      const connection = new Connection(netCluster, 'confirmed');
      const mintPublicKey = new PublicKey(inputMintAddress);

      const mint = await getMint(connection, mintPublicKey);
      setMintData(mint);

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        mintPublicKey,
        { programId: TOKEN_PROGRAM_ID }
      );
      setTokenAccounts(tokenAccounts.value);

      setStatusMessage('Mint account data loaded successfully.');
    } catch (err) {
      console.error('Error loading mint account:', err);
      setStatusMessage('Failed to load mint account. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  const createAndMintTokens = async () => {
    if (!inputMintAddress) {
      setStatusMessage('Please enter a mint account public key!');
      return;
    }
  
    if (!publicKey) {
      setStatusMessage('Public key not found!');
      return;
    }
  
    setLoading(true);
    setStatusMessage('');
  
    try {
      const connection = new Connection(netCluster, 'confirmed');
      const mintPublicKey = new PublicKey(inputMintAddress);
      const ownerPublicKey = new PublicKey(publicKey);

      // TODO: Create logic here
  
      
    } catch (err) {
      console.error('Error creating tokens:', err);
      setStatusMessage('Failed to creating tokens. Check the console for details.');
    } finally {
      setLoading(false);
    }
  };
  

  const formatMintData = (data) => {
    if (!data) return null;

    return (
      <div className="space-y-2">
        <div className='font-semibold'><strong className='font-medium text-[#2e70c1] text-[20px]'>Mint Address:</strong> {data.address?.toBase58()}</div>
        <div className='font-semibold'><strong className='font-medium text-[#2e70c1] text-[20px]'>Mint Authority:</strong> {data.mintAuthority ? data.mintAuthority?.toBase58() : 'None'}</div>
        <div className='font-semibold'><strong className='font-medium text-[#2e70c1] text-[20px]'>Decimals:</strong> {data.decimals}</div>
        <div className='font-semibold'><strong className='font-medium text-[#2e70c1] text-[20px]'>Is Initialized:</strong> {data.isInitialized ? 'Yes' : 'No'}</div>
        <div className='font-semibold'><strong className='font-medium text-[#2e70c1] text-[20px]'>Freeze Authority:</strong> {data.freezeAuthority ? data.freezeAuthority?.toBase58() : 'None'}</div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">SPL Token Mint Account</h1>
        <input
          type="text"
          value={inputMintAddress}
          onChange={(e) => setInputMintAddress(e.target.value)}
          placeholder="Enter mint account public key"
          className="text-black border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <button
          onClick={createMintAccount}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Creating Mint Account...' : 'Create Mint Account'}
        </button>
        <button
          onClick={loadMintAccount}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Loading Mint Data...' : 'Load Mint Data'}
        </button>
        <button
          onClick={createAndMintTokens}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? 'Minting Tokens...' : 'Mint Tokens'}
        </button>
        {statusMessage && <div className="mt-4 text-green-500">{statusMessage}</div>}
        {mintAccountAddress && <div className="mt-4 text-white-500">Mint Address: {mintAccountAddress}</div>}
        {mintData && (
          <div className="mt-4 p-4 bg-gray-100 border rounded">
            {formatMintData(mintData)}
          </div>
        )}
        {associatedTokenAddress && (
          <div className="mt-4 p-4 bg-gray-100 border rounded">
            <strong className='font-semibold'>Associated Token Address:</strong> {associatedTokenAddress}
          </div>
        )}
      </div>
    </div>
  );
};

export default MintAccountPage;
