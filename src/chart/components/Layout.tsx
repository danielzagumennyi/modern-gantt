import { CSSProperties, useEffect, useRef } from 'react';

import { Graph } from '../Graph';
import { preventDefault } from '../helpers';
import { useChartStore } from '../useChartStore';
import { AutoScrollHandle } from './AutoScrollHandle';

import styles from './Layout.module.css';

export const Layout = () => {
  const { useStore, useProps } = useChartStore();

  const rowHeight = useProps((s) => s.rowHeight);

  const renderAbove = useProps((s) => s.renderAbove);

  const containerWidth = useStore((s) => s.containerWidth);
  const containerHeight = useStore((s) => s.containerHeight);

  const isIdle = useStore((s) => !s.connecting && !s.dragging && !s.resizing);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerHeight = scrollContainerRef.current
    ? scrollContainerRef.current.clientHeight - (rowHeight + 16)
    : null;

  useEffect(() => {
    const el = scrollContainerRef.current;

    el?.addEventListener('drag', preventDefault);
    el?.addEventListener('drop', preventDefault);

    return () => {
      el?.removeEventListener('drag', preventDefault);
      el?.removeEventListener('drop', preventDefault);
    };
  }, [isIdle]);

  useEffect(() => {
    useStore.setState({
      containerElement: scrollContainerRef.current,
    });

    return () => {
      useStore.setState({
        containerElement: null,
      });
    };
  }, [useStore]);

  return (
    <div
      className={styles.root}
      style={
        {
          '--height': containerHeight + 'px',
          '--scroll-container-height': scrollContainerHeight + 'px',
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

        <div className={styles.layout} ref={scrollContainerRef}>
          <div className={styles.header}>{renderAbove?.()}</div>

          <div className={styles.content}>
            <Graph />
          </div>
        </div>
      </div>
    </div>
  );
};
