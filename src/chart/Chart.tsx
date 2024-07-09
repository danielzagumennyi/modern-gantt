import { memo } from "react";
import { ChartProvider } from "./ChartProvider";
import { StoreProvider } from "./ChartStoreProvider";

import { AirTable } from "../airTable/AirTable";
import { useSidebar } from "../hooks/useSidebar";
import { Sidebar } from "../sidebar/Sidebar";
import { ThemeProvider } from "../themeProvider/ThemeProvider";
import { Graph } from "./Graph";
import { ChartProps } from "./types";

export const Chart = memo((props: ChartProps) => {
  const { ref, minWidth, maxWidth } = useSidebar();

  const { minSidebarWidth, maxSidebarWidth, columns, bars } = props;

  return (
    <StoreProvider>
      <ChartProvider {...props}>
        <ThemeProvider rowHeight={props.rowHeight}>
          <div ref={ref} style={{ display: "flex" }}>
            {!!columns?.length && (
              <Sidebar
                minWidth={Math.max(minWidth, minSidebarWidth || minWidth)}
                maxWidth={Math.min(maxWidth, maxSidebarWidth || maxWidth)}
              >
                <AirTable columns={columns} data={bars} rowKey="id" />
              </Sidebar>
            )}
            <Graph />
          </div>
        </ThemeProvider>
      </ChartProvider>
    </StoreProvider>
  );
});
