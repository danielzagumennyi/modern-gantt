import { isNumber } from "lodash-es";
import { memo, PropsWithChildren, useEffect, useMemo } from "react";
import { useChartStore } from "../useChartStore";

const MAX_X = 25_000;

export const Container = memo((props: PropsWithChildren) => {
  const { useStore, useProps } = useChartStore();

  const bars = useProps((s) => s.bars);
  const rowHeight = useProps((s) => s.rowHeight);

  const positions = useStore((s) => s.originalPositions);
  const padding = useStore((s) => s.padding);

  // const [ref, { width }] = useResizeObserver<HTMLDivElement>();

  const maxX = useMemo(() => {
    const maxValue = Object.values(positions).reduce((acc, item) => {
      acc = Math.max(
        ...[item?.x1, item?.x2].filter(isNumber).map(Math.abs),
        acc,
        MAX_X
      );

      return acc;
    }, 0);

    return Math.round(maxValue);
  }, [positions]);

  useEffect(() => {
    useStore.setState({
      maxX,
      containerWidth: maxX * 2 + padding * 2,
      containerHeight: bars.length * rowHeight,
    });
  }, [bars.length, maxX, padding, rowHeight, useStore]);

  return <>{props.children}</>;
});
