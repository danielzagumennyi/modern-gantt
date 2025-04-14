import { useEffect, useImperativeHandle } from 'react';

import { isNumber } from 'lodash-es';

import { ChartBar } from '../chart/components/ChartBar';
import { ChartGroup } from '../chart/components/ChartGroup';
import { ConnectHandle } from '../chart/components/ConnectHandle';
import { LineDependence } from '../chart/components/LineDependence';
import { ResizeHandle } from '../chart/components/ResizeHandle';
import { ChartProps, DependenceDefinition, RenderBar } from '../chart/types';
import { useChartStore } from '../chart/useChartStore';

const defaultRenderDependence = (data: DependenceDefinition) => {
  return <LineDependence data={data} />;
};

export const defaultRenderBar: RenderBar = ({ data }) => {
  if (data.isGroup) {
    return <ChartGroup color={data.color} />;
  }

  if (isNumber(data.x1) && isNumber(data.x2)) {
    return (
      <ChartBar id={data.id}>
        <ResizeHandle id={data.id} side="start" />
        <ResizeHandle id={data.id} side="end" />
        <ConnectHandle id={data.id} side="start" />
        <ConnectHandle id={data.id} side="end" />
      </ChartBar>
    );
  }

  return null;

  // if (isNumber(data.x1)) {
  //   return (
  //     <StartOnlyBar id={data.id}>
  //       <ConnectHandle id={data.id} side="start" />
  //     </StartOnlyBar>
  //   );
  // }

  // if (isNumber(data.x2)) {
  //   return (
  //     <EndOnlyBar id={data.id}>
  //       <ConnectHandle id={data.id} side="end" />
  //     </EndOnlyBar>
  //   );
  // }
};

export const useProvideProps = ({
  bars,
  dependencies,
  lines,
  rowHeight = 48,
  onBarsChange,
  onDependenciesChange,
  renderAbove,
  renderBar = defaultRenderBar,
  renderDependence = defaultRenderDependence,
  onDependenceClick,
  minWidth,
  apiRef,
  ...rest
}: ChartProps) => {
  const { useProps, api } = useChartStore();

  useImperativeHandle(apiRef, () => api);

  useEffect(() => {
    useProps.setState({
      minWidth,
      bars,
      rowHeight,
      dependencies,
      lines,
      onBarsChange,
      onDependenciesChange,
      renderAbove,
      renderBar,
      renderDependence,
      onDependenceClick,
      ...rest,
    });
  }, [
    bars,
    dependencies,
    lines,
    minWidth,
    onBarsChange,
    onDependenceClick,
    onDependenciesChange,
    renderAbove,
    renderBar,
    renderDependence,
    rest,
    rowHeight,
    useProps,
  ]);
};
