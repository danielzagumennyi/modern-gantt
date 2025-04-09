import { PropsWithChildren, useRef, useState } from 'react';

import { clamp } from 'lodash-es';

import { useDragController } from '../hooks/useDragController';
import { ScrollSync } from './ScrollSync';

import styles from './Sidebar.module.css';

interface IProps {
  maxWidth: number;
  minWidth: number;
  defaultWidth?: number;
}
export const Sidebar = ({
  maxWidth,
  minWidth,
  children,
  defaultWidth,
}: PropsWithChildren<IProps>) => {
  const [width, setWidth] = useState(defaultWidth || 200);
  const [resizing, setResizing] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const widthRef = useRef<number>(0);

  const { listeners } = useDragController({
    onStart: () => {
      setResizing(true);
      widthRef.current = width;
    },
    onMove: ({ deltaX }) => {
      if (!ref.current) return;
      const _width = clamp(width + deltaX, minWidth, maxWidth);
      widthRef.current = _width;
      ref.current.style.width = _width + 'px';
    },
    onEnd: () => {
      setResizing(false);
      setWidth(widthRef.current);
    },
  });

  return (
    <div
      className={styles.root}
      style={{ width }}
      data-resizing={resizing}
      ref={ref}
    >
      <ScrollSync>{children}</ScrollSync>
      <div className={styles.resizeHandle} {...listeners} />
    </div>
  );
};
