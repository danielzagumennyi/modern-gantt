import { isNumber } from "lodash-es";
import { useEffect, useMemo } from "react";
import { ChartProps, Position } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";

export const useChartComputed = ({ bars, rowHeight }: ChartProps) => {
  const { useStore } = useChartStore();

  const overridePositions = useStore((s) => s.overridePositions);

  const originalPositions = useMemo(() => {
    return bars.reduce<Partial<Record<number | string, Position>>>(
      (acc, item, index) => {
        if (!isNumber(item.x1) && !isNumber(item.x2)) {
          acc[item.id] = undefined;
          return acc;
        }

        acc[item.id] = {
          x1: item.x1,
          x2: item.x2,
          y1: index * rowHeight,
          y2: index * rowHeight + rowHeight,
        };

        return acc;
      },
      {}
    );
  }, [bars, rowHeight]);

  useEffect(() => {
    useStore.setState({ originalPositions });
  }, [originalPositions, useStore]);

  const positions = useMemo(() => {
    return bars.reduce<Partial<Record<number | string, Position>>>(
      (acc, item) => {
        acc[item.id] = overridePositions[item.id] || originalPositions[item.id];
        return acc;
      },
      {}
    );
  }, [bars, originalPositions, overridePositions]);

  useEffect(() => {
    useStore.setState({ positions });
  }, [positions, useStore]);
};
