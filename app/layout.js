"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "./src/context/ContextWallet";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <WalletProvider>
        <body className={inter.className}>{children}</body>
      </WalletProvider>
    </html>
  );
}
