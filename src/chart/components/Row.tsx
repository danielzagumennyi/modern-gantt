import { memo } from "react";
import { useRow } from "../../hooks/useRow";
import { BarDefinition } from "../types";
import { useChartStore } from "../useChartStore";
import { Creation } from "./Creation";

import styles from "../../Chart.module.css";

export const Row = memo(
  ({ data, order }: { data: BarDefinition; order: number }) => {
    const { useProps } = useChartStore();

    const rowHeight = useProps((s) => s.rowHeight);

    const { listeners, isPreDraw, ref, style } = useRow({ data });

    return (
      <div
        {...listeners}
        className={styles.row}
        ref={ref}
        style={{
          top: order * rowHeight,
        }}
      >
        {isPreDraw ? (
          <div style={style}>
            <Creation />
          </div>
        ) : null}
      </div>
    );
  }
);
