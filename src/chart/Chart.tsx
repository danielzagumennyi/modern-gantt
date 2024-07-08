import { Fragment, memo, useEffect, useRef, useState } from "react";
import { ChartProvider, ChartProviderProps } from "./ChartProvider";
import { StoreProvider } from "./ChartStoreProvider";
import { Bar } from "./components/Bar";
import { Connection } from "./components/Connection";
import { Container } from "./components/Container";
import { Line } from "./components/Line";
import { Row } from "./components/Row";
import { Selection } from "./components/Selection";
import { isNumberValue } from "./helpers";
import { useChartStore } from "./useChartStore";
import { AutoScrollHandle } from "./components/AutoScrollHandle";

export type ChartProps = Pick<
  ChartProviderProps,
  | "bars"
  | "dependencies"
  | "lines"
  | "onBarsChange"
  | "onDependenciesChange"
  | "rowHeight"
  | "renderBar"
  | "renderAbove"
>;

import styles from "../Chart.module.css";
import { ThemeProvider } from "../ThemeProvider";

export const Chart = memo((props: ChartProps) => {
  return (
    <StoreProvider>
      <ChartProvider {...props}>
        <Component />
      </ChartProvider>
    </StoreProvider>
  );
});

const Component = memo(() => {
  const { useStore, api } = useChartStore();

  const rowHeight = useStore((s) => s.rowHeight);
  const containerHeight = useStore((s) => s.containerHeight);
  const containerWidth = useStore((s) => s.containerWidth);
  const lines = useStore((s) => s.lines);
  const maxX = useStore((s) => s.maxX);
  const dependencies = useStore((s) => s.dependencies);
  const data = useStore((s) => s.bars);
  const selected = useStore((s) => s.selected);
  const renderAbove = useStore((s) => s.renderAbove);
  const renderDependence = useStore((s) => s.renderDependence);

  const draggingId = useStore((s) => s.dragging?.id);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const sorted = [...data].sort((a, b) => {
      if (!isNumberValue(a.x1)) {
        return 1;
      }

      if (!isNumberValue(b.x1)) {
        return -1;
      }

      return a.x1 - b.x1;
    });

    if (!sorted[0]) return;

    setTimeout(() => api.scrollTo(sorted[0].id), 0);

    setReady(true);
  }, [api, data, ready]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useStore.setState({
      containerElement: scrollContainerRef.current,
    });

    return () => useStore.setState({ containerElement: null });
  }, [useStore]);

  return (
    <ThemeProvider rowHeight={rowHeight}>
      <div
        className={styles.root}
        style={{
          "--container-width": containerWidth + "px",
          "--container-height": containerHeight + "px",
          "--max-x": maxX + "px",
        }}
      >
        {draggingId ? (
          <>
            <AutoScrollHandle side={"start"} />
            <AutoScrollHandle side={"end"} />
          </>
        ) : null}

        <div ref={scrollContainerRef} className={styles.scrollContainer}>
          {renderAbove?.()}

          <Container>
            <div className={styles.sizeContainerInner}>
              <div className={styles.contentContainer}>
                {data.map((bar, index) => (
                  <Row key={bar.id} data={bar} order={index} />
                ))}

                <svg
                  className={styles.svg}
                  viewBox={`-${maxX} 0 ${containerWidth} ${containerHeight}`}
                  width={containerWidth}
                  height={containerHeight}
                >
                  {dependencies?.map((d) => (
                    <Fragment key={JSON.stringify(d)}>
                      {renderDependence(d)}
                    </Fragment>
                  ))}
                  <Connection />
                </svg>

                {selected.map((id) => (
                  <Selection key={id} id={id} />
                ))}
                {lines?.map((line) => (
                  <Line key={line.id} data={line} />
                ))}
                {data.map((bar) => (
                  <Bar key={bar.id} data={bar} />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
});
