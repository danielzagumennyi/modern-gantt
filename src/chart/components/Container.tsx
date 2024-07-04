import { useElementSize } from "@mantine/hooks";
import { isNumber } from "lodash-es";
import { memo, PropsWithChildren, useEffect, useMemo } from "react";
import { useChartStore } from "../useChartStore";

export const Container = memo((props: PropsWithChildren) => {
  const { useStore } = useChartStore();

  const positions = useStore((s) => s.positions);

  const { ref, width, height } = useElementSize<HTMLDivElement>();

  useEffect(() => {
    useStore.setState((prev) => ({
      ...prev,

      containerWidth: width,
      containerHeight: Math.max(prev.bars.length * prev.rowHeight, height),
    }));
  }, [height, useStore, width]);

  const maxX = useMemo(() => {
    const maxValue = Object.values(positions).reduce((acc, item) => {
      acc = Math.max(
        ...[item?.x1, item?.x2].filter(isNumber).map(Math.abs),
        acc,
        width / 2
      );

      return acc;
    }, 0);

    return maxValue;
  }, [positions, width]);

  const minX = useMemo(() => {
    const minValue = Object.values(positions).reduce((acc, item) => {
      acc = Math.min(...[item?.x1, item?.x2].filter(isNumber), acc);

      return acc;
    }, 0);

    return minValue;
  }, [positions]);

  useEffect(() => {
    useStore.setState({ maxX });
  }, [maxX, useStore]);

  useEffect(() => {
    useStore.setState({ minX });
  }, [minX, useStore]);

  return (
    <div
      style={{
        width: "max-content",
        overflow: "hidden",
        position: "relative",
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
});
