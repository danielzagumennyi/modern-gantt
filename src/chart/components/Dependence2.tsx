import { memo, useMemo } from "react";
import { generatePath } from "../helpers";
import { DependenceDefinition } from "../types";
import { useChartStore } from "../useChartStore";

export const Dependence2 = memo(({ data }: { data: DependenceDefinition }) => {
  const { useStore } = useChartStore();

  const rowHeight = useStore((s) => s.rowHeight);
  const fromBar = useStore((s) => s.positions[data.from]);
  const toBar = useStore((s) => s.positions[data.to]);

  const rect = useMemo(() => {
    if (!fromBar || !toBar) return null;

    const y1 = fromBar.y1 + rowHeight / 2;
    const y2 = toBar.y2 - rowHeight / 2;

    if (data.fromSide === "end" && data.toSide === "start") {
      const x1 = fromBar.x2;
      const x2 = toBar.x1;

      return (
        <g>
          <path
            fill="none"
            stroke="#000"
            strokeWidth={1}
            d={generatePath({
              startPoint: { x: x1, y: y1 },
              endPoint: { x: x2, y: y2 },
              offset: 30,
              rowHeight,
              endSide: data.toSide,
              startSide: data.fromSide,
            })}
          />
        </g>
      );
    }

    if (data.fromSide === "end" && data.toSide === "end") {
      const x1 = fromBar.x2;
      const x2 = toBar.x2;

      return (
        <g>
          <path
            fill="none"
            stroke="#000"
            strokeWidth={1}
            d={generatePath({
              startPoint: { x: x1, y: y1 },
              endPoint: { x: x2, y: y2 },
              offset: 30,
              rowHeight,
              endSide: data.toSide,
              startSide: data.fromSide,
            })}
          />
        </g>
      );
    }

    if (data.fromSide === "start" && data.toSide === "start") {
      const x1 = fromBar.x1;
      const x2 = toBar.x1;

      return (
        <g>
          <path
            fill="none"
            stroke="#000"
            strokeWidth={1}
            d={generatePath({
              startPoint: { x: x1, y: y1 },
              endPoint: { x: x2, y: y2 },
              offset: 30,
              rowHeight,
              endSide: data.toSide,
              startSide: data.fromSide,
            })}
          />
        </g>
      );
    }

    if (data.fromSide === "start" && data.toSide === "end") {
      const x1 = fromBar.x1;
      const x2 = toBar.x2;

      return (
        <g>
          <path
            fill="none"
            stroke="#000"
            strokeWidth={1}
            d={generatePath({
              startPoint: { x: x1, y: y1 },
              endPoint: { x: x2, y: y2 },
              offset: 30,
              rowHeight,
              endSide: data.toSide,
              startSide: data.fromSide,
            })}
          />
        </g>
      );
    }

    return null;
  }, [data.fromSide, data.toSide, fromBar, rowHeight, toBar]);

  return rect;
});
