import { isNumber } from "lodash-es";
import { ReactNode, useEffect, useMemo } from "react";
import {
  BarDefinition,
  DependenceDefinition,
  LineDefinition,
  Position,
} from "./types";
import { useChartStore } from "./useChartStore";

export type ChartProviderProps = React.PropsWithChildren<{
  bars: BarDefinition[];
  onBarsChange?: (v: BarDefinition[]) => void;
  dependencies?: DependenceDefinition[];
  onDependenciesChange?: (v: DependenceDefinition[]) => void;
  lines?: LineDefinition[];
  rowHeight: number;

  renderBar?: (data: BarDefinition) => ReactNode;
  renderDependence?: (data: DependenceDefinition) => ReactNode;
  renderAbove?: () => ReactNode;
}>;

export const ChartProvider = ({
  children,
  bars,
  onBarsChange,
  dependencies,
  onDependenciesChange,
  lines,
  renderBar,
  renderAbove,
  renderDependence,

  rowHeight,
}: ChartProviderProps) => {
  const { useStore } = useChartStore();

  const overridePositions = useStore((s) => s.overridePositions);

  useEffect(() => {
    useStore.setState((prev) => ({
      ...prev,

      bars: bars,
      onBarsChange,

      dependencies,
      onDependenciesChange,

      lines,

      rowHeight: rowHeight || prev.rowHeight,

      renderBar: renderBar || prev.renderBar,
      renderAbove: renderAbove || prev.renderAbove,
      renderDependence: renderDependence || prev.renderDependence,
    }));
  }, [
    bars,
    dependencies,
    lines,
    onBarsChange,
    onDependenciesChange,
    renderAbove,
    renderBar,
    rowHeight,
    useStore,
    renderDependence,
  ]);

  const originalPositions = useMemo(() => {
    return bars.reduce<Partial<Record<number | string, Position>>>(
      (acc, item, index) => {
        if (!isNumber(item.x1) || !isNumber(item.x2)) {
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

  return <>{children}</>;
};
