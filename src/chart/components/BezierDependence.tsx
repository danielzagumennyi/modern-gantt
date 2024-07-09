import { memo, useMemo } from "react";
import { DependenceDefinition, Position } from "../types";
import { useChartStore } from "../useChartStore";

import styles from "../../Chart.module.css";

export const BezierDependence = memo(
  ({ data }: { data: DependenceDefinition }) => {
    const { useStore, useProps } = useChartStore();

    const rowHeight = useProps((s) => s.rowHeight);

    const fromBar = useStore((s) => s.positions[data.from]);
    const toBar = useStore((s) => s.positions[data.to]);

    const rect = useMemo(() => {
      if (!fromBar || !toBar) return null;

      const offset = 200;

      const y1 = fromBar.y1 + rowHeight / 2;
      const y2 = toBar.y2 - rowHeight / 2;

      if (data.fromSide === "end" && data.toSide === "start") {
        const rect: Position = {
          x1: fromBar.x2,
          x2: toBar.x1,
          y1,
          y2,
        };

        return (
          <g className={styles.dependence}>
            <path
              d={`M${rect.x1},${rect.y1}
                C${rect.x1 + offset},${rect.y1}
                ${rect.x2 - offset},${rect.y2}
                ${rect.x2},${rect.y2}`}
            />
          </g>
        );
      }

      if (data.fromSide === "end" && data.toSide === "end") {
        const rect: Position = {
          x1: fromBar.x2,
          x2: toBar.x2,
          y1,
          y2,
        };

        return (
          <g className={styles.dependence}>
            <path
              d={`M${rect.x1},${rect.y1}
                C${rect.x1 + offset},${rect.y1}
                ${rect.x2 + offset},${rect.y2}
                ${rect.x2},${rect.y2}`}
            />
          </g>
        );
      }

      if (data.fromSide === "start" && data.toSide === "start") {
        const rect: Position = {
          x1: fromBar.x1,
          x2: toBar.x1,
          y1,
          y2,
        };

        return (
          <g className={styles.dependence}>
            <path
              d={`M${rect.x1},${rect.y1}
                C${rect.x1 - offset},${rect.y1}
                ${rect.x2 - offset},${rect.y2}
                ${rect.x2},${rect.y2}`}
            />
          </g>
        );
      }

      if (data.fromSide === "start" && data.toSide === "end") {
        const rect: Position = {
          x1: fromBar.x1,
          x2: toBar.x2,
          y1,
          y2,
        };

        return (
          <g className={styles.dependence}>
            <path
              d={`M${rect.x1},${rect.y1}
                C${rect.x1 - offset},${rect.y1}
                ${rect.x2 + offset},${rect.y2}
                ${rect.x2},${rect.y2}`}
            />
          </g>
        );
      }

      return null;
    }, [data.fromSide, data.toSide, fromBar, rowHeight, toBar]);

    return rect;
  }
);
