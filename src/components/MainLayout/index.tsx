'use client';
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { useStores } from '@/store/storeProvider';
import Header from './Header';

import '@radix-ui/themes/styles.css';
import './index.scss';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { CommonStore: themeStore } = useStores();
  return (
    <Theme>
      <main className={`main-layout ${themeStore.themeMode}`}>
        <Header />
        <div>{children}</div>
      </main>
    </Theme>
  );
};

export default MainLayout;
