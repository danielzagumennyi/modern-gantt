import { PropsWithChildren, forwardRef } from 'react';

import { useBarState } from '../../hooks/useBarState';
import { useDragHandle } from '../../hooks/useDragHandle';

import styles from '../../Chart.module.css';

type Props = PropsWithChildren<{
  id: string | number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  draggable?: boolean;
  resizable?: boolean;
  connectable?: boolean;
}>;

export const ChartBar = forwardRef<HTMLDivElement, Props>(
  ({ id, children, onClick, draggable, resizable, connectable }, ref) => {
    const listeners = useDragHandle({
      id,
    });

    const state = useBarState(id);

    return (
      <div
        ref={ref}
        {...(draggable ? listeners : undefined)}
        className={styles.bar}
        data-draggable={draggable}
        data-resizable={resizable}
        data-connectable={connectable}
        data-state={state}
        onClick={onClick}
      >
        {children}
      </div>
    );
  },
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
  },
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
  },
);
