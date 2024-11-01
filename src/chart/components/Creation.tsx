import { CSSProperties } from "react";
import styles from "../../Chart.module.css";
import { useChartStore } from "../useChartStore";
import { Tooltip } from "@mantine/core";

export const Creation = () => {
  const { useStore, useProps } = useChartStore();

  const creation = useStore((s) => s.creation);
  const rowHeight = useProps((s) => s.rowHeight);

  if (!creation) return null;

  const style: CSSProperties = {
    position: "absolute",
    left: 0,
    top: creation.y,
    transform: `translateX(${creation.x}px)`,
    display: "flex",
    alignItems: "center",
    height: rowHeight,
    width: 0,
  };

  return (
    <div style={style}>
      <Tooltip label={"Click to schedule"} opened withArrow color="dark">
        <div className={styles.creation} />
      </Tooltip>
    </div>
  );
};
