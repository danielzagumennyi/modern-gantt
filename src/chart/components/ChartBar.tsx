import { forwardRef, PropsWithChildren } from "react";
import { useDragHandle } from "../../hooks/useDragHandle";

import { useBarState } from "../../hooks/useBarState";

import styles from "../../Chart.module.css";

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

export const StartOnlyBar = forwardRef<HTMLDivElement, Props>(
  ({ id, children, onClick }, ref) => {
    const state = useBarState(id);

    return (
      <div
        ref={ref}
        data-state={state}
        className={styles.startBar}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

export const EndOnlyBar = forwardRef<HTMLDivElement, Props>(
  ({ id, children, onClick }, ref) => {
    const state = useBarState(id);

    return (
      <div
        ref={ref}
        data-state={state}
        className={styles.endBar}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);
