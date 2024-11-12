import { convertPositionToStyle } from "../helpers";
import { useChartStore } from "../useChartStore";

import styles from "../../Chart.module.css";

export const Selection = ({ id }: { id: number | string }) => {
  const { useStore, useProps } = useChartStore();

  const position = useStore((s) => s.positions[id]);
  const getBarWidth = useProps((s) => s.getBarWidth);

  if (!position) return null;

  return (
    <div
      className={styles.selection}
      style={convertPositionToStyle(position, getBarWidth)}
    />
  );
};
