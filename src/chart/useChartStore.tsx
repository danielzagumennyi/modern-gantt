import {useContext} from "react";
import {StoreContext} from "./ChartStoreProvider";

export const useChartStore = () => useContext(StoreContext);
