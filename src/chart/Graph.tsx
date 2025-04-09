import { CSSProperties, Fragment, memo } from 'react';

import { useInitialScroll } from '../hooks/useInitialScroll';
import { Bar } from './components/Bar';
import { Connection } from './components/Connection';
import { Container } from './components/Container';
import { Creation } from './components/Creation';
import { Line } from './components/Line';
import { Row } from './components/Row';
import { Selection } from './components/Selection';
import { TodayLine } from './components/TodayLine';
import { useChartStore } from './useChartStore';

import styles from '../Chart.module.css';

export const Graph = memo(() => {
  const { useStore, useProps } = useChartStore();

  const containerElement = useStore((s) => s.containerElement);
  const todayElement = useStore((s) => s.todayElement);

  const bars = useProps((s) => s.bars);
  const lines = useProps((s) => s.lines);
  const dependencies = useProps((s) => s.dependencies);

  const renderDependence = useProps((s) => s.renderDependence);

  const maxX = useStore((s) => s.maxX);
  const selected = useStore((s) => s.selected);
  const containerWidth = useStore((s) => s.containerWidth);
  const containerHeight = useStore((s) => s.containerHeight);
  const isIdle = useStore((s) => !s.connecting && !s.dragging && !s.resizing);

  useInitialScroll({ containerElement, todayElement });

  const cssVars = {
    '--container-width': containerWidth + 'px',
    '--container-height': containerHeight + 'px',
    '--max-x': maxX + 'px',
  } as CSSProperties;

  return (
    <div className={styles.root} style={cssVars}>
      <Container>
        <div className={styles.contentContainer}>
          <svg
            className={styles.svg}
            viewBox={`-${maxX} 0 ${containerWidth} ${containerHeight}`}
            width={containerWidth}
            height={containerHeight}
          >
            <defs>
              <marker
                id="arrow-marker"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="1"
                markerHeight="1"
                orient="auto-start-reverse"
                markerUnits="strokeWidth"
                fill="var(--dep-color)"
              >
                <path d="M 0 0 L 7 5 L 0 10 z" />
              </marker>
              <marker
                id="arrow-marker-hover"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="1"
                markerHeight="1"
                orient="auto-start-reverse"
                markerUnits="strokeWidth"
                fill="var(--dep-hover-color)"
              >
                <path d="M 0 0 L 7 5 L 0 10 z" />
              </marker>
            </defs>
            {bars.map((data, i) => (
              <Row key={data.id} data={data} order={i} />
            ))}
            {dependencies?.map((d) => (
              <Fragment key={JSON.stringify(d)}>
                {renderDependence?.(d)}
              </Fragment>
            ))}
            <Connection />
          </svg>

          {isIdle && <Creation />}

          {selected.map((id) => (
            <Selection key={id} id={id} />
          ))}
          {lines?.map((line) => <Line key={line.id} data={line} />)}
          <TodayLine />

          {bars.map((bar) => (
            <Bar key={bar.id} data={bar} />
          ))}
        </div>
      </Container>
    </div>
  );
});
