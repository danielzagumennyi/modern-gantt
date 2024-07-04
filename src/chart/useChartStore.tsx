import { useContext } from "react";
import { StoreContext } from "./ChartStoreProvider";

export const useChartStore = () => {
  const useStore = useContext(StoreContext);

  return useStore;
};
