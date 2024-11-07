import { memo, PropsWithChildren } from "react";
import { useDragHandle } from "../../hooks/useDragHandle";

import styles from "../../Chart.module.css";
import { useBarState } from "../../hooks/useBarState";

export const ChartBar = memo(
  ({
    id,
    children,
    onClick,
  }: PropsWithChildren<{
    id: string | number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }>) => {
    const listeners = useDragHandle({
      id,
    });

    const state = useBarState(id);

    return (
      <div
        {...listeners}
        className={styles.bar}
        data-state={state}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);
