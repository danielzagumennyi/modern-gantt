import "@mantine/core/styles.css";
import { useCallback, useMemo, useState } from "react";

import { startOfDay } from "date-fns";
import { Chart } from "../chart/Chart";
import { isNumberValue } from "../chart/helpers";
import {
  BarDefinition,
  DependenceDefinition,
  LineDefinition,
} from "../chart/types";
import { GanttBar } from "./components/GanttBar";
import { Timeline } from "./components/Timeline";
import { calculateCoordinate, calculateDateFromPixel } from "./helpers";
import { Flex } from "@mantine/core";
import { Sidebar } from "./components/Sidebar";
import { useElementSize } from "@mantine/hooks";

export type GanttProps = {
  bars: GanttBarDefinition[];
  onBarsChange?: (v: GanttBarDefinition[]) => void;
  dependencies?: GanttDependenceDefinition[];
  onDependenciesChange?: (v: GanttDependenceDefinition[]) => void;
  intervalWidth?: number;
  rowHeight: number;
  viewType: GanttViewType;
  timelineGroupType?: GanttViewType;
};

export type GanttBarDefinition = {
  id: string | number;
  start: Date | null;
  end: Date | null;
  children?: GanttBarDefinition[];
};

export type GanttDependenceDefinition = DependenceDefinition;

export type GanttViewType =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

const intervalByView: Record<GanttViewType, number> = {
  hour: 50,
  day: 50,
  week: 175,
  month: 175,
  quarter: 175,
  year: 175,
};

export const Gantt = ({
  intervalWidth,
  rowHeight,
  bars,
  onBarsChange,
  dependencies,
  onDependenciesChange,
  viewType,
  timelineGroupType,
}: GanttProps) => {
  const _intervalWidth = intervalWidth || intervalByView[viewType];

  const _bards = useMemo(() => {
    return bars.map<BarDefinition>((b) => ({
      id: b.id,
      x1: calculateCoordinate(b.start, _intervalWidth, viewType),
      x2: calculateCoordinate(b.end, _intervalWidth, viewType),
    }));
  }, [_intervalWidth, bars, viewType]);

  const _onBarsChange = useCallback(
    (bars: BarDefinition[]) => {
      const rounded = bars.map((b) => ({
        ...b,
        x1: isNumberValue(b.x1) ? b.x1 : b.x1,
        x2: isNumberValue(b.x2) ? b.x2 : b.x2,
      }));

      onBarsChange?.(
        rounded.map((b) => ({
          id: b.id,
          start: isNumberValue(b.x1)
            ? startOfDay(calculateDateFromPixel(b.x1, _intervalWidth, viewType))
            : b.x1,
          end: isNumberValue(b.x2)
            ? startOfDay(calculateDateFromPixel(b.x2, _intervalWidth, viewType))
            : b.x2,
        }))
      );
    },
    [_intervalWidth, onBarsChange, viewType]
  );

  const [lines] = useState<LineDefinition[]>([{ id: "today", x: 0 }]);

  const renderBar = useCallback(
    (b: BarDefinition) => (
      <GanttBar
        data={{
          id: b.id,
          start: isNumberValue(b.x1)
            ? calculateDateFromPixel(b.x1, _intervalWidth, viewType)
            : b.x1,
          end: isNumberValue(b.x2)
            ? calculateDateFromPixel(b.x2, _intervalWidth, viewType)
            : b.x2,
        }}
      />
    ),
    [_intervalWidth, viewType]
  );

  const { ref, width } = useElementSize<HTMLDivElement>();

  const maxWidth = width / 2;

  return (
    <Flex style={{ border: "1px solid var(--mantine-color-gray-1)" }} ref={ref}>
      <Sidebar
        data={bars}
        rowHeight={rowHeight}
        maxWidth={maxWidth}
        minWidth={Math.min(200, maxWidth)}
      />

      <Chart
        rowHeight={rowHeight}
        bars={_bards}
        onBarsChange={_onBarsChange}
        lines={lines}
        renderBar={renderBar}
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
    </Flex>
  );
};
