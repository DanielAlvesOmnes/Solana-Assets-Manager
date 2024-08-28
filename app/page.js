"use client";
import React, { useState } from 'react';
import MainContent from './src/components/MainContent';
import Header from './src/components/Header';
import Navbar from './src/components/NavBar';
import Footer from './src/components/Footer';
import Modal from './src/components/Modal';

export default function Home() {
  const [userPublicKey, setUserPublicKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFooterButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="min-h-full">
      <Navbar />
      <Header setUserPublicKey={setUserPublicKey} />
      <main>
        <MainContent userPublicKey={userPublicKey} />
      </main>
      <Footer onButtonClick={handleFooterButtonClick} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Generate Key Pair">
        <p>This is where you can generate your key pair. Add any additional information or inputs needed here.</p>
      </Modal>
    </div>
  );
}
