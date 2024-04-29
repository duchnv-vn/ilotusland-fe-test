'use client';
import React from 'react';
import { Dialog } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TicketDetailModal from '../TicketDetailModal';
import { useStores } from '@/store/storeProvider';
import Button from '../ui/button';

import './index.scss';

const TicketDetailModalWrapper = () => {
  const {
    CommonStore: { isOpenTicketModal, setIsOpenTicketModal },
  } = useStores();

  return (
    <Dialog.Root open={isOpenTicketModal}>
      <Dialog.Content className="modal-content">
        <Button
          {...{
            className: 'close-button',
            icon: faXmark,
            onClick: () => setIsOpenTicketModal(false),
          }}
        />
        <TicketDetailModal />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default observer(TicketDetailModalWrapper);
