import { useEffect } from "react";
import { ChartBar } from "../chart/components/ChartBar";
import { ConnectHandle } from "../chart/components/ConnectHandle";
import { LineDependence } from "../chart/components/LineDependence";
import { ResizeHandle } from "../chart/components/ResizeHandle";
import { ChartProps, DependenceDefinition, RenderBar } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { ChartGroup } from "../chart/components/ChartGroup";

const defaultRenderDependence = (data: DependenceDefinition) => {
  return <LineDependence data={data} />;
};

const defaultRenderBar: RenderBar = ({ data }) => {
  if (data.isGroup) {
    return <ChartGroup color={data.color} />;
  }

  return (
    <ChartBar id={data.id}>
      <ResizeHandle id={data.id} side="start" />
      <ResizeHandle id={data.id} side="end" />
      <ConnectHandle id={data.id} side="start" />
      <ConnectHandle id={data.id} side="end" />
    </ChartBar>
  );
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
  onDependenceClick,
  minWidth,
}: ChartProps) => {
  const { useProps } = useChartStore();

  useEffect(() => {
    useProps.setState({
      minWidth,
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
      onDependenceClick,
    });
  }, [
    minWidth,
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
    onDependenceClick,
  ]);
};
