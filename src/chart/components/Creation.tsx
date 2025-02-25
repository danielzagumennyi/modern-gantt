import { Tooltip } from "@mantine/core";
import { CSSProperties } from "react";
import { useChartStore } from "../useChartStore";

import styles from "../../Chart.module.css";

export const Creation = () => {
  const { useStore, useProps } = useChartStore();

  const renderInvalidBar = useProps((s) => s.renderInvalidBar);
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
      {renderInvalidBar ? (
        renderInvalidBar({ creation, rowHeight })
      ) : (
        <Tooltip label={"Click to schedule"} opened withArrow color="dark">
          <div className={styles.creation} />
        </Tooltip>
      )}
    </div>
  );
};
