import { PropsWithChildren, createContext, useRef } from 'react';

import { ChartApi, UseProps, UseStore, createChartStore } from './store';

type ChartContextValue = {
  useStore: UseStore;
  useProps: UseProps;
  api: ChartApi;
};

export const StoreContext = createContext<ChartContextValue>(
  null as unknown as ChartContextValue,
);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const chartStore = useRef(createChartStore());

  return (
    <StoreContext.Provider value={chartStore.current}>
      {children}
    </StoreContext.Provider>
  );
};
