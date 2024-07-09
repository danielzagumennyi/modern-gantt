import { useEffect } from "react";
import { useChartStore } from "../chart/useChartStore";
import {
  BarDefinition,
  ChartProps,
  DependenceDefinition,
} from "../chart/types";
import { LineDependence } from "../chart/components/LineDependence";
import { ChartBar } from "../chart/components/ChartBar";

const defaultRenderDependence = (data: DependenceDefinition) => {
  return <LineDependence data={data} />;
};

const defaultRenderBar = (data: BarDefinition) => {
  return <ChartBar data={data} />;
};

export const useProvideProps = ({
  bars,
  columns,
  dependencies,
  lines,
  rowHeight = 48,
  maxSidebarWidth = 600,
  minSidebarWidth = 200,
  onBarsChange,
  onDependenciesChange,
  renderAbove,
  renderBar = defaultRenderBar,
  renderDependence = defaultRenderDependence,
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
