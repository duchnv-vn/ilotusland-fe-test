'use client';
import { ReactNode, createContext, useContext } from 'react';
import { useStore } from './index';
import ProjectStore from './stores/Project';
import TicketsStore from './stores/Tickets';
import UserStore from './stores/User';
import CommonStore from './stores/Common';
import { BoardTypes, BoardGroupBy } from '@/common/enum/board';
import { ThemeModes } from '@/common/enum/theme';
import {
  dummyAsignee0,
  dummyProject,
  dummyProjectMembers,
  dummyTicketsByBoard,
  dummyTicketsByList,
} from './stores/dummy-data';

type RootStoreProps = {
  TicketsStore: TicketsStore;
  ProjectStore: ProjectStore;
  UserStore: UserStore;
  CommonStore: CommonStore;
};

export const StoreContext = createContext<RootStoreProps>({} as RootStoreProps);

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  const ProjectStoreValues = useStore('ProjectStore', {
    project: dummyProject,
    members: dummyProjectMembers,
  });
  const ComonStoreValues = useStore('CommonStore', {
    mode: ThemeModes['theme-light'],
    boardType: BoardTypes['list'],
    groupBy: BoardGroupBy['User'],
  });
  const UserStoreValues = useStore('UserStore', {
    user: dummyAsignee0,
    notificationNumber: 10,
  });
  const TicketsStoreValues = useStore('TicketsStore', {
    ticketsByBoard: dummyTicketsByBoard,
    ticketsByList: dummyTicketsByList,
  });

  return (
    <StoreContext.Provider
      value={{
        CommonStore: ComonStoreValues,
        UserStore: UserStoreValues,
        ProjectStore: ProjectStoreValues,
        TicketsStore: TicketsStoreValues,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => {
  return useContext(StoreContext);
};
