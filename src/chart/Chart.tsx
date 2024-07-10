import { ChartProvider } from "./ChartProvider";
import { StoreProvider } from "./ChartStoreProvider";

import { Layout } from "./components/Layout";
import { ChartProps } from "./types";

export const Chart = (props: ChartProps) => {
  return (
    <StoreProvider>
      <ChartProvider {...props}>
        <Layout />
      </ChartProvider>
    </StoreProvider>
  );
};
