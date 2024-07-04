import "@mantine/core/styles.css";
import { Fragment, memo, useEffect, useState } from "react";
import styled from "styled-components";
import { ChartProvider, ChartProviderProps } from "./ChartProvider";
import { StoreProvider } from "./ChartStoreProvider";
import { AutoScrollHandle } from "./components/AutoScrollHandle";
import { Bar } from "./components/Bar";
import { Connection } from "./components/Connection";
import { Container } from "./components/Container";
import { Line } from "./components/Line";
import { Row } from "./components/Row";
import { Selection } from "./components/Selection";
import { useChartStore } from "./useChartStore";
import { isNumberValue } from "./helpers";

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

  const containerHeight = useStore((s) => s.containerHeight);
  const lines = useStore((s) => s.lines);
  const maxX = useStore((s) => s.maxX);
  const dependencies = useStore((s) => s.dependencies);
  const data = useStore((s) => s.bars);
  const selected = useStore((s) => s.selected);
  const renderAbove = useStore((s) => s.renderAbove);
  const renderDependence = useStore((s) => s.renderDependence);

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

  return (
    <div
      style={{
        boxShadow: "0 0 0 1px blue",
        width: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      {renderAbove?.()}

      <AutoScrollHandle />

      <Container>
        <Wrapper
          style={{
            width: maxX * 2,
            minHeight: containerHeight,
          }}
        >
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            viewBox={`-${maxX} 0 ${maxX * 2} ${containerHeight}`}
            width={maxX * 2}
            height={containerHeight}
          >
            {dependencies?.map((d) => (
              <Fragment key={JSON.stringify(d)}>{renderDependence(d)}</Fragment>
            ))}
            <Connection />
          </svg>

          <div
            style={{
              paddingLeft: maxX,
              position: "absolute",
              width: maxX * 2,
              height: containerHeight,
            }}
          >
            {selected.map((id) => (
              <Selection key={id} id={id} />
            ))}
            {lines?.map((line) => (
              <Line key={line.id} data={line} />
            ))}
            {data.map((bar, index) => (
              <Row key={bar.id} data={bar} order={index} />
            ))}
            {data.map((bar) => (
              <Bar key={bar.id} data={bar} />
            ))}
          </div>
        </Wrapper>
      </Container>
    </div>
  );
});

const Wrapper = styled.div`
  background: repeating-linear-gradient(
    to right,
    lightgray,
    lightgray 1px,
    transparent 1px,
    transparent 100px
  );
`;
