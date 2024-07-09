import { CSSProperties, Fragment, memo, useEffect, useRef } from "react";
import { AutoScrollHandle } from "./components/AutoScrollHandle";
import { Bar } from "./components/Bar";
import { Connection } from "./components/Connection";
import { Container } from "./components/Container";
import { Line } from "./components/Line";
import { Row } from "./components/Row";
import { Selection } from "./components/Selection";
import { useChartStore } from "./useChartStore";

import styles from "../Chart.module.css";
import { useInitialScroll } from "../hooks/useInitialScroll";

export const Graph = memo(() => {
  const { useStore, useProps, api } = useChartStore();

  const bars = useProps((s) => s.bars);
  const lines = useProps((s) => s.lines);
  const dependencies = useProps((s) => s.dependencies);

  const renderAbove = useProps((s) => s.renderAbove);
  const renderDependence = useProps((s) => s.renderDependence);

  const maxX = useStore((s) => s.maxX);
  const selected = useStore((s) => s.selected);
  const draggingId = useStore((s) => s.dragging?.id);
  const containerWidth = useStore((s) => s.containerWidth);
  const containerHeight = useStore((s) => s.containerHeight);

  useInitialScroll(bars, api);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useStore.setState({
      containerElement: scrollContainerRef.current,
    });

    return () => useStore.setState({ containerElement: null });
  }, [useStore]);

  const cssVars = {
    "--container-width": containerWidth + "px",
    "--container-height": containerHeight + "px",
    "--max-x": maxX + "px",
  } as CSSProperties;

  return (
    <div className={styles.root} style={cssVars}>
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
              {bars.map((bar, index) => (
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
                    {renderDependence?.(d)}
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
              {bars.map((bar) => (
                <Bar key={bar.id} data={bar} />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
});
