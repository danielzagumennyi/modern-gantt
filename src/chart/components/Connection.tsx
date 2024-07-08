import { memo } from "react";
import { useChartStore } from "../useChartStore";

import styles from "../../Chart.module.css";

export const Connection = memo(() => {
  const { useStore } = useChartStore();

  const con = useStore((s) => s.connecting);
  const positions = useStore((s) => s.positions);
  const rowHeight = useStore((s) => s.rowHeight);

  if (!con) return null;

  const fromPos = positions[con.from];
  if (!fromPos) return null;

  const x1 = con.fromSide === "start" ? fromPos.x1 : fromPos.x2;
  const y1 = fromPos.y1 + rowHeight / 2;

  const x2 = con.x;
  const y2 = con.y;

  return (
    <g className={styles.connection} data-valid={!!con.to}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <circle cx={x2} cy={y2} />
    </g>
  );
});
