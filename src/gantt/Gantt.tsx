import { CSSProperties, useCallback, useMemo, useState } from "react";

import { startOfDay } from "date-fns";
import { AirTable, IAirTableColumnDef } from "../airTable/AirTable";
import { Chart } from "../chart/Chart";
import { isNumberValue } from "../chart/helpers";
import { BarDefinition, LineDefinition } from "../chart/types";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { Sidebar } from "../sidebar/Sidebar";
import { Timeline } from "./components/Timeline";
import { calculateCoordinate, calculateDateFromPixel } from "./helpers";
import {
  GanttBarDefinition,
  GanttDependenceDefinition,
  GanttViewType,
} from "./types";

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

  const [ref, { width }] = useResizeObserver<HTMLDivElement>();

  const maxWidth = width / 2;

  const columns: IAirTableColumnDef<GanttBarDefinition>[] = [
    {
      field: "id",
      header: "Name",
    },
  ];

  return (
    <div
      ref={ref}
      style={
        {
          minWidth: 0,
          display: "flex",
          border: "1px solid var(--border-color)",

          "--row-height": rowHeight + "px",

          "--sidebar-active-resize-color": "#339af0",

          "--header-height": "50px",
          "--bar-height": "24px",
          "--border-radius": "6px",

          "--border-color": "#dee2e6",

          "--header-bg": "#fff",
          "--row-odd-bg": "#f1f3f5",
          "--row-even-bg": "#f8f9fa",

          "--bar-bg": "#339af0",
          "--creation-bg": "#a5d8ff",
          "--group-bg": "#ff922b",

          "--text-size": "12px",

          "--dep-color": "#868e96",
          "--invalid-dep-color": "#fa5252",
          "--dep-width": "2px",

          "--resize-handle-bg": "#1c7ed6",
          "--resize-handle-inner-bg": "#fff",

          "--label-bg": "#ced4da",
          "--label-color": "#343a40",

          "--connect-color": "#228be6",
          "--connect-inner-color": "#fff",
          "--valid-connect-color": "#40c057",

          "--selection-bg": "rgba(51, 154, 240, 0.1)",
        } as CSSProperties
      }
    >
      <Sidebar maxWidth={maxWidth} minWidth={Math.min(200, maxWidth)}>
        <AirTable columns={columns} data={bars} rowKey="id" />
      </Sidebar>

      <Chart
        rowHeight={rowHeight}
        bars={_bards}
        onBarsChange={_onBarsChange}
        lines={lines}
        // renderBar={renderBar}
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
    </div>
  );
};
