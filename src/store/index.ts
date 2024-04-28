import { enableStaticRendering } from 'mobx-react-lite';
import CommonStore from './stores/Common';
import ProjectStore from './stores/Project';
import TicketsStore from './stores/Tickets';
import UserStore from './stores/User';
import {
  CommonStoreData,
  ProjectStoreData,
  TicketStoreData,
  UserStoreData,
} from './type';

type InitData =
  | CommonStoreData
  | UserStoreData
  | ProjectStoreData
  | TicketStoreData;

type StoreType = TicketsStore | ProjectStore | UserStore | CommonStore;

const Stores = {
  TicketsStore,
  ProjectStore,
  UserStore,
  CommonStore,
};
type StoresType = typeof Stores;

enableStaticRendering(typeof window === 'undefined');
let clientStores: Record<string, StoreType> = {};

const initStore = (initData: any, storeName: keyof StoresType) => {
  const StoreClass = Stores[storeName];
  const store = clientStores[storeName] ?? new StoreClass();

  if (initData) store.hydrate(initData);

  if (typeof window === 'undefined') return store;
  if (!clientStores[storeName]) clientStores[storeName] = store;
  return store;
};

export function useStore(storeName: keyof StoresType, initData: InitData): any {
  return initStore(initData, storeName);
}
