import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import Head from 'next/head'
 
function IndexPage() {
  return (
    <div>
      <Head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4992058049429673"
     crossOrigin="anonymous"></script>
      </Head>
      
    </div>
  )
}
 



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image to ASCII",
  description: "Turn any image into a bunch of ASCII characters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
