import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import React from 'react';
import AdSense from "./components/AdSense";





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
      <head>
        <AdSense pId="ca-pub-4992058049429673"/>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
