import { Side } from "../types";
import { useConnectHandle } from "../../hooks/useConnectHandle";
import { useConnectable } from "../../hooks/useConnectable";

import styles from "../../Chart.module.css";

export const ConnectHandle = ({
  id,
  side,
}: {
  id: string | number;
  side: Side;
}) => {
  const listeners = useConnectHandle({ id, side });
  const { ref, isOver, isAvailable } = useConnectable<HTMLDivElement>({
    id,
    side,
  });

  if (!isAvailable) return null;

  return (
    <div
      ref={ref}
      {...listeners}
      className={styles.connectHandle}
      data-is-over={isOver}
      data-side={side}
    >
      <div></div>
    </div>
  );
};
