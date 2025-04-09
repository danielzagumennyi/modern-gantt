import { CSSProperties } from 'react';

import { ScrollSource } from '../../scrollSync/ScrollSource';
import { Graph } from '../Graph';
import { useChartStore } from '../useChartStore';
import { AutoScrollHandle } from './AutoScrollHandle';

import styles from './Layout.module.css';

export const Layout = () => {
  const { useStore, useProps } = useChartStore();

  const renderAbove = useProps((s) => s.renderAbove);

  const containerWidth = useStore((s) => s.containerWidth);
  const containerHeight = useStore((s) => s.containerHeight);

  const isIdle = useStore((s) => !s.connecting && !s.dragging && !s.resizing);

  return (
    <div
      className={styles.root}
      style={
        {
          '--content-height': containerHeight + 'px',
          '--content-width': containerWidth + 'px',
        } as CSSProperties
      }
    >
      <div className={styles.relative}>
        {!isIdle && (
          <>
            <AutoScrollHandle side="start" />
            <AutoScrollHandle side="end" />
          </>
        )}

        <ScrollSource className={styles.layout}>
          <div className={styles.header}>{renderAbove?.()}</div>
          <div className={styles.content}>
            <Graph />
          </div>
        </ScrollSource>
      </div>
    </div>
  );
};
