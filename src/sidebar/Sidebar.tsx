import { PropsWithChildren, useEffect, useState } from 'react';

import { clamp } from 'lodash-es';

import { useSidebar } from '../chart/store';
import { useDragController } from '../hooks/useDragController';

import styles from './Sidebar.module.css';

interface IProps {
  maxWidth: number;
  minWidth: number;
}
export const Sidebar = ({
  maxWidth,
  minWidth,
  children,
}: PropsWithChildren<IProps>) => {
  const [initWidth, setInitWidth] = useState(-1);

  const { listeners } = useDragController({
    onStart: () => setInitWidth(useSidebar.getState().sidebarWidth),
    onMove: ({ deltaX }) => {
      const width = clamp(initWidth + deltaX, minWidth, maxWidth);
      useSidebar.setState({
        sidebarWidth: width,
      });
    },
    onEnd: () => setInitWidth(-1),
  });

  useEffect(() => {
    useSidebar.setState((prev) => ({
      ...prev,
      sidebarWidth: clamp(prev.sidebarWidth, minWidth, maxWidth),
    }));
  }, [maxWidth, minWidth]);

  return (
    <div className={styles.root} data-resizing={initWidth !== -1}>
      <div className={styles.content}>{children}</div>
      <div className={styles.resizeHandle} {...listeners} />
    </div>
  );
};
