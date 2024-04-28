'use client';
import { ReactNode, createContext, useContext } from 'react';
import { RootStore } from './index';

export const StoreContext = createContext(RootStore);

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={RootStore}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => {
  return useContext(StoreContext);
};

// enableStaticRendering(typeof window === 'undefined');

// let store: any;

// export async function getStores() {
//   if (typeof window !== 'undefined' && store) return store;

//   store = new RootStore();
//   return store;
// }

// export const StoreWrapper = ({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) => {
//   const [initData, setInitData] = useState(false);

//   async function getData() {
//     store = await getStores();
//     setInitData(true);
//   }

//   useEffect(() => {
//     getData();

//     // if (store) store.onMount();

//     // return () => store.onUnmount();
//   }, [initData]);

//   if (!store) return <></>;

//   return (
//     <MobXProviderContext.Provider value={store}>
//       {children}
//     </MobXProviderContext.Provider>
//   );
// };
