import { convertPositionToStyle } from "../helpers";
import { useChartStore } from "../useChartStore";

import styles from "../../Chart.module.css";

export const Selection = ({ id }: { id: number | string }) => {
  const { useStore } = useChartStore();

  const position = useStore((s) => s.positions[id]);

  if (!position) return null;

  return (
    <div
      className={styles.selection}
      style={convertPositionToStyle(position)}
    />
  );
};
