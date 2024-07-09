import { useEffect } from "react";
import { useChartStore } from "../chart/useChartStore";
import { ChartProps } from "../chart/types";

export const useProvideProps = ({
  bars,
  rowHeight,
  columns,
  dependencies,
  lines,
  maxSidebarWidth,
  minSidebarWidth,
  onBarsChange,
  onDependenciesChange,
  renderAbove,
  renderBar,
  renderDependence,
}: ChartProps) => {
  const { useProps } = useChartStore();

  useEffect(() => {
    useProps.setState({
      bars,
      rowHeight,
      columns,
      dependencies,
      lines,
      maxSidebarWidth,
      minSidebarWidth,
      onBarsChange,
      onDependenciesChange,
      renderAbove,
      renderBar,
      renderDependence,
    });
  }, [
    bars,
    columns,
    dependencies,
    lines,
    maxSidebarWidth,
    minSidebarWidth,
    onBarsChange,
    onDependenciesChange,
    renderAbove,
    renderBar,
    renderDependence,
    rowHeight,
    useProps,
  ]);
};
