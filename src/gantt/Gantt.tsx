import { useCallback, useMemo, useState } from "react";

import { IAirTableColumnDef } from "../airTable/AirTable";
import { Chart } from "../chart/Chart";
import {
  BarDefinition,
  ChartProps,
  LineDefinition,
  RenderBar,
} from "../chart/types";
import { Timeline } from "./components/Timeline";
import { calculateCoordinate, calculateDateFromPixel } from "./helpers";
import { GanttBarDefinition, GanttViewType } from "./types";
import { isNumberValue } from "../chart/helpers";
import { startOfDay } from "date-fns";

export type GanttProps<DATA extends GanttBarDefinition> = {
  bars: DATA[];
  onBarsChange?: (type: "add" | "remove" | "update", bar: DATA) => void;
  intervalWidth?: number;
  viewType: GanttViewType;
  timelineGroupType?: GanttViewType;
  columns?: IAirTableColumnDef<DATA>;
  renderBar?: RenderBar<DATA>;
} & Omit<ChartProps, "bars" | "onBarsChange" | "columns" | "renderBar">;

const intervalByView: Record<GanttViewType, number> = {
  hour: 50,
  day: 50,
  week: 175,
  month: 175,
  quarter: 175,
  year: 175,
};

export const Gantt = <DATA extends GanttBarDefinition>({
  intervalWidth,
  rowHeight = 48,
  minSidebarWidth = 200,
  maxSidebarWidth = 600,
  bars,
  onBarsChange,
  dependencies,
  onDependenciesChange,
  viewType = "day",
  timelineGroupType = "week",
  columns,
  renderBar,
}: // renderAbove,
// onBarsChange,
// renderDependence
GanttProps<DATA>) => {
  const _intervalWidth = intervalWidth || intervalByView[viewType];

  const _bards = useMemo(() => {
    return bars.map<BarDefinition>((b) => ({
      ...b,
      id: b.id,
      x1: calculateCoordinate(b.start, _intervalWidth, viewType),
      x2: calculateCoordinate(b.end, _intervalWidth, viewType),
    }));
  }, [_intervalWidth, bars, viewType]);

  const _onBarsChange = useCallback(
    (type: "add" | "update", b: BarDefinition) => {
      // const rounded = bars.map((b) => ({
      //   ...b,
      //   x1: isNumberValue(b.x1) ? b.x1 : b.x1,
      //   x2: isNumberValue(b.x2) ? b.x2 : b.x2,
      // }));

      const item: GanttBarDefinition = {
        ...b,
        id: b.id,
        start: isNumberValue(b.x1)
          ? startOfDay(calculateDateFromPixel(b.x1, _intervalWidth, viewType))
          : b.x1,
        end: isNumberValue(b.x2)
          ? startOfDay(calculateDateFromPixel(b.x2, _intervalWidth, viewType))
          : b.x2,
      };

      onBarsChange?.(type, item as DATA);
    },
    [_intervalWidth, onBarsChange, viewType]
  );

  const [lines] = useState<LineDefinition[]>([{ id: "today", x: 0 }]);

  // const renderBar = useCallback(
  //   (b: BarDefinition) => (
  //     <GanttBar
  //       data={{
  //         id: b.id,
  //         start: isNumberValue(b.x1)
  //           ? calculateDateFromPixel(b.x1, _intervalWidth, viewType)
  //           : b.x1,
  //         end: isNumberValue(b.x2)
  //           ? calculateDateFromPixel(b.x2, _intervalWidth, viewType)
  //           : b.x2,
  //       }}
  //     />
  //   ),
  //   [_intervalWidth, viewType]
  // );

  return (
    <Chart
      columns={columns as IAirTableColumnDef<BarDefinition>[] | undefined}
      rowHeight={rowHeight}
      bars={_bards}
      onBarsChange={_onBarsChange}
      lines={lines}
      minSidebarWidth={minSidebarWidth}
      maxSidebarWidth={maxSidebarWidth}
      renderBar={renderBar as RenderBar | undefined}
      dependencies={dependencies}
      onDependenciesChange={onDependenciesChange}
      renderAbove={() => (
        <Timeline viewType={viewType} groupBy={timelineGroupType} />
      )}

      // intervalWidth={intervalWidth}
      // rowHeight={rowHeight}
      // bars={bars}
      // onBarsChange={(bars) => {
      //   setBars(
      //     bars.map((b) => ({
      //       ...b,
      //       x1: isNumberValue(b.x1)
      //         ? roundNearestPosition(b.x1, intervalWidth)
      //         : b.x1,
      //       x2: isNumberValue(b.x2)
      //         ? roundNearestPosition(b.x2, intervalWidth)
      //         : b.x2,
      //     }))
      //   );
      // }}
      // dependencies={dependencies}
      // onDependenciesChange={setDependencies}
      // lines={lines}
    />
  );
};
