import { useCallback, useMemo, useState } from "react";

import { IAirTableColumnDef } from "../airTable/AirTable";
import { Chart } from "../chart/Chart";
import { isNumberValue } from "../chart/helpers";
import {
  BarDefinition,
  ChartProps,
  LineDefinition,
  RenderBar,
} from "../chart/types";
import { Timeline } from "./components/Timeline";
import { calculateCoordinate, calculateDate } from "./helpers";
import { GanttBarDefinition, GanttViewType } from "./types";

export type GanttProps<DATA extends GanttBarDefinition> = {
  bars: DATA[];
  onBarsChange?: (type: "add" | "remove" | "update", bar: DATA) => void;
  viewType: GanttViewType;
  columns?: IAirTableColumnDef<DATA>[];
  renderBar?: RenderBar<DATA>;
} & Omit<
  ChartProps,
  "bars" | "onBarsChange" | "columns" | "renderBar" | "intervalWidth"
>;

const intervalByView: Record<GanttViewType, number> = {
  day: 50,
  week: 20,
  month: 15,
  quarter: 4,
  year: 1,
};

const nearestRound = (value: number | null, n: number) => {
  return isNumberValue(value) ? Math.round(value / n) * n : null;
};

export const Gantt = <DATA extends GanttBarDefinition>({
  rowHeight = 48,
  minSidebarWidth = 200,
  maxSidebarWidth = 600,
  bars,
  onBarsChange,
  dependencies,
  onDependenciesChange,
  viewType = "day",
  columns,
  renderBar,
  onDependenceClick,
}: GanttProps<DATA>) => {
  const _intervalWidth = intervalByView[viewType];

  const _bards = useMemo(() => {
    return bars.map<BarDefinition>((b) => ({
      ...b,
      id: b.id,
      x1: calculateCoordinate(b.start, _intervalWidth),
      x2: calculateCoordinate(b.end, _intervalWidth, true),
    }));
  }, [_intervalWidth, bars]);

  const _onBarsChange = useCallback(
    (type: "add" | "update", b: BarDefinition) => {
      const item: GanttBarDefinition = {
        ...b,
        id: b.id,
        start: calculateDate(
          nearestRound(b.x1, _intervalWidth),
          _intervalWidth
        ),
        end: calculateDate(
          nearestRound(b.x2, _intervalWidth),
          _intervalWidth,
          true
        ),
      };

      onBarsChange?.(type, item as DATA);
    },
    [_intervalWidth, onBarsChange]
  );

  const [lines] = useState<LineDefinition[]>([{ id: "today", x: 0 }]);

  return (
    <Chart
      columns={columns as IAirTableColumnDef<BarDefinition>[] | undefined}
      rowHeight={rowHeight}
      bars={_bards}
      minWidth={_intervalWidth}
      onBarsChange={_onBarsChange}
      lines={lines}
      minSidebarWidth={minSidebarWidth}
      maxSidebarWidth={maxSidebarWidth}
      renderBar={renderBar as RenderBar | undefined}
      dependencies={dependencies}
      onDependenciesChange={onDependenciesChange}
      renderAbove={() => (
        <Timeline viewType={viewType} intervalWidth={_intervalWidth} />
      )}
      onDependenceClick={onDependenceClick}
    />
  );
};
