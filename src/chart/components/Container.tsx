import { useElementSize } from "@mantine/hooks";
import { isNumber } from "lodash-es";
import { memo, PropsWithChildren, useEffect, useMemo } from "react";
import { useChartStore } from "../useChartStore";

export const Container = memo((props: PropsWithChildren) => {
  const { useStore } = useChartStore();

  const positions = useStore((s) => s.originalPositions);
  const padding = useStore((s) => s.padding);

  const { ref, width } = useElementSize<HTMLDivElement>();

  const maxX = useMemo(() => {
    const maxValue = Object.values(positions).reduce((acc, item) => {
      acc = Math.max(
        ...[item?.x1, item?.x2].filter(isNumber).map(Math.abs),
        acc,
        width / 2
      );

      return acc;
    }, 0);

    return Math.round(maxValue);
  }, [positions, width]);

  useEffect(() => {
    useStore.setState((prev) => ({
      ...prev,
      containerWidth: maxX * 2 + padding * 2,
      containerHeight: prev.bars.length * prev.rowHeight,
    }));
  }, [maxX, padding, useStore]);

  useEffect(() => {
    useStore.setState({ maxX });
  }, [maxX, useStore]);

  return (
    <div
      style={{
        width: "100%",
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
});
