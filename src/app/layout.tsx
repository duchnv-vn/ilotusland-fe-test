import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreWrapper } from '@/store/storeProvider';

import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kanban board',
  description: 'iLotusLand FE test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreWrapper>
        <body className={inter.className}>{children}</body>
      </StoreWrapper>
    </html>
  );
}
