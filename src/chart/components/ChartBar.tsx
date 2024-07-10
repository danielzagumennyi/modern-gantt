import { memo, PropsWithChildren } from "react";
import { useDragHandle } from "../../hooks/useDragHandle";

import styles from "../../Chart.module.css";
import { useBarState } from "../../hooks/useBarState";

export const ChartBar = memo(
  ({ id, children }: PropsWithChildren<{ id: string | number }>) => {
    const listeners = useDragHandle({
      id,
    });

    const state = useBarState(id);

    return (
      <div {...listeners} className={styles.bar} data-state={state}>
        {children}
      </div>
    );
  }
);
