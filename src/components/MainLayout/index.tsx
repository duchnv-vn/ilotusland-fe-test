'use client';
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/store/storeProvider';
import Header from './Header';
import TicketDetailModalWrapper from '../TicketDetailModalWrapper';

import '@radix-ui/themes/styles.css';
import './index.scss';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    CommonStore: { themeMode },
  } = useStores();

  return (
    <Theme>
      <main className={`main-layout ${themeMode}`}>
        <Header />
        <div>{children}</div>
      </main>
      <TicketDetailModalWrapper />
    </Theme>
  );
};

export default observer(MainLayout);
