import { memo } from "react";
import { useRow } from "../../hooks/useRow";
import { BarDefinition } from "../types";
import { useChartStore } from "../useChartStore";

import styles from "../../Chart.module.css";

export const Row = memo(
  ({ data, order }: { data: BarDefinition; order: number }) => {
    const { useProps } = useChartStore();

    const rowHeight = useProps((s) => s.rowHeight);

    const { listeners, ref } = useRow({ data, order });

    return (
      <rect
        className={styles.svgRow}
        ref={ref}
        y={order * rowHeight}
        {...listeners}
      />
    );
  }
);
