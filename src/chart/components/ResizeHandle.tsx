import { useResizeHandle } from "../../hooks/useResizeHandle";
import { Side } from "../types";

import styles from "../../Chart.module.css";

export const ResizeHandle = ({
  id,
  side,
}: {
  id: string | number;
  side: Side;
}) => {
  const { listeners } = useResizeHandle({
    id,
    side,
  });

  return (
    <div className={styles.resizeHandle} {...listeners} data-side={side}>
      <div></div>
    </div>
  );
};
