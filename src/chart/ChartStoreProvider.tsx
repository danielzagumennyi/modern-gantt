import { createContext, PropsWithChildren, useRef } from "react";
import { createApi, createChartStore, UseStore } from "./store";

type ChartContextValue = {
  useStore: UseStore;
  api: ReturnType<typeof createApi>;
};

export const StoreContext = createContext<ChartContextValue>(
  null as unknown as ChartContextValue
);

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const chartStore = useRef(createChartStore());

  return (
    <StoreContext.Provider value={chartStore.current}>
      {children}
    </StoreContext.Provider>
  );
};
