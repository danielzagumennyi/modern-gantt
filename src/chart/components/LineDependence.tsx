import { memo, useMemo } from "react";
import { generatePathString } from "../helpers";
import { DependenceDefinition } from "../types";
import { useChartStore } from "../useChartStore";

import styles from "../../Chart.module.css";
import { Coordinates } from "../helpers/coordinates/types";

export const LineDependence = memo(
  ({ data }: { data: DependenceDefinition }) => {
    const { useStore, useProps } = useChartStore();

    const rowHeight = useProps((s) => s.rowHeight);

    const fromBar = useStore((s) => s.positions[data.from]);
    const toBar = useStore((s) => s.positions[data.to]);

    const rect = useMemo(() => {
      if (!fromBar || !toBar) return null;

      const horizontalOffset = rowHeight / 2;
      const verticalOffset = rowHeight / 2;

      const y1 = fromBar.y1 + verticalOffset;
      const y2 = toBar.y1 + verticalOffset;

      const points: Coordinates[] = [];

      if (data.fromSide === "start" && data.toSide === "start") {
        const x1 = fromBar.x1;
        const x2 = toBar.x1;

        points.push(
          { x: x1, y: y1 },
          {
            x: Math.min(x1, x2) - horizontalOffset,
            y: y1,
          },
          {
            x: Math.min(x1, x2) - horizontalOffset,
            y: y2,
          },
          {
            x: x2,
            y: y2,
          }
        );
      }

      if (data.fromSide === "end" && data.toSide === "end") {
        const x1 = fromBar.x2;
        const x2 = toBar.x2;

        points.push(
          { x: x1, y: y1 },
          {
            x: Math.max(x1, x2) + horizontalOffset,
            y: y1,
          },
          {
            x: Math.max(x1, x2) + horizontalOffset,
            y: y2,
          },
          {
            x: x2,
            y: y2,
          }
        );
      }

      if (data.fromSide === "end" && data.toSide === "start") {
        const x1 = fromBar.x2;
        const x2 = toBar.x1;

        if (x2 >= x1 + horizontalOffset * 2) {
          points.push(
            { x: x1, y: y1 },
            {
              x: x1 + horizontalOffset,
              y: y1,
            },
            {
              x: x1 + horizontalOffset,
              y: y2,
            },
            {
              x: x2,
              y: y2,
            }
          );
        } else {
          points.push(
            { x: x1, y: y1 },
            {
              x: x1 + horizontalOffset,
              y: y1,
            },
            {
              x: x1 + horizontalOffset,
              y: y1 < y2 ? y1 + verticalOffset : y1 - verticalOffset,
            },
            {
              x: x2 - horizontalOffset,
              y: y2,
            },
            {
              x: x2,
              y: y2,
            }
          );
        }
      }

      if (data.fromSide === "start" && data.toSide === "end") {
        const x1 = fromBar.x1;
        const x2 = toBar.x2;

        if (x2 <= x1 - horizontalOffset * 2) {
          points.push(
            { x: x1, y: y1 },
            {
              x: x1 - horizontalOffset,
              y: y1,
            },
            {
              x: x1 - horizontalOffset,
              y: y2,
            },
            {
              x: x2,
              y: y2,
            }
          );
        } else {
          points.push(
            { x: x1, y: y1 },
            {
              x: x1 - horizontalOffset,
              y: y1,
            },
            {
              x: x1 - horizontalOffset,
              y: y1 < y2 ? y1 + verticalOffset : y1 - verticalOffset,
            },
            {
              x: x2 + horizontalOffset,
              y: y2,
            },
            {
              x: x2,
              y: y2,
            }
          );
        }
      }

      return (
        <g className={styles.dependence}>
          <path d={generatePathString(points)} />
        </g>
      );
    }, [data.fromSide, data.toSide, fromBar, rowHeight, toBar]);

    return rect;
  }
);
