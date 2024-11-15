import { forwardRef, PropsWithChildren } from "react";
import { useDragHandle } from "../../hooks/useDragHandle";

import styles from "../../Chart.module.css";
import { useBarState } from "../../hooks/useBarState";

type Props = PropsWithChildren<{
  id: string | number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}>;

export const ChartBar = forwardRef<HTMLDivElement, Props>(
  ({ id, children, onClick }, ref) => {
    const listeners = useDragHandle({
      id,
    });

    const state = useBarState(id);

    return (
      <div
        ref={ref}
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
