import { useCallback, useMemo, useState } from "react";

import { Chart } from "../chart/Chart";
import {
  BarDefinition,
  ChartProps,
  LineDefinition,
  Position,
} from "../chart/types";
import { calculateCoordinate, calculateDate } from "./helpers";
import { GanttBarDefinition, GanttRenderBar, GanttViewType } from "./types";
import { defaultRenderBar } from "../hooks/useProvideProps";
import { nearestRound } from "../chart/helpers";
import { IAirTableColumnDef } from "../airTable/types";
import { Timeline } from "./components/Timeline/Timeline";

export type GanttProps<DATA extends GanttBarDefinition> = {
  bars: DATA[];
  onBarsChange?: (type: "add" | "remove" | "update", bar: DATA) => void;
  viewType: GanttViewType;
  columns?: IAirTableColumnDef<DATA>[];
  renderBar?: GanttRenderBar<DATA>;
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

  const _bars = useMemo(() => {
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
          _intervalWidth,
        ),
        end: calculateDate(
          nearestRound(b.x2, _intervalWidth),
          _intervalWidth,
          true,
        ),
      };

      onBarsChange?.(type, item as DATA);
    },
    [_intervalWidth, onBarsChange],
  );

  const [lines] = useState<LineDefinition[]>([{ id: "today", x: 0 }]);

  const _renderBar = useCallback(
    (props: { data: BarDefinition; position: Position; width: number }) => {
      if (renderBar) {
        return renderBar({
          intervalWidth: _intervalWidth,
          data: props.data as unknown as DATA,
          position: props.position,
          width: props.width,
        });
      }

      return defaultRenderBar({
        data: props.data,
        position: props.position,
        width: props.width,
      });
    },
    [_intervalWidth, renderBar],
  );

  return (
    <Chart
      columns={columns as IAirTableColumnDef<BarDefinition>[] | undefined}
      rowHeight={rowHeight}
      bars={_bars}
      minWidth={_intervalWidth}
      onBarsChange={_onBarsChange}
      lines={lines}
      minSidebarWidth={minSidebarWidth}
      maxSidebarWidth={maxSidebarWidth}
      renderBar={_renderBar}
      dependencies={dependencies}
      onDependenciesChange={onDependenciesChange}
      renderAbove={() => (
        <Timeline viewType={viewType} intervalWidth={_intervalWidth} />
      )}
      onDependenceClick={onDependenceClick}
    />
  );
};
