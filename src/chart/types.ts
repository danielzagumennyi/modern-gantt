import { ReactNode, RefObject } from 'react';

import { ChartApi } from './store';

export type Position = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export type ResizingData = {
  id: string | number;
  side: Side;
};

export type ConnectingData = {
  from: string | number;
  fromSide: Side;
  to: string | number | null;
  toSide: Side | null;
  x: number;
  y: number;
};

export type CreationData = {
  id: string | number;
  x: number;
  y: number;
};

export type DraggingData = {
  id: string | number;
};

export type DependenceDefinition = {
  from: string | number;
  fromSide: Side;
  to: string | number;
  toSide: Side;
};

export type Side = 'start' | 'end';

export type DatesRange = {
  start: Date;
  end: Date;
};

export type BarDefinition = {
  id: string | number;
  x1: number | null;
  x2: number | null;
  draggable?: boolean;
  resizable?: boolean;
  connectable?: boolean;
  isGroup?: boolean;
  color?: string | null;
};

export type LineDefinition = {
  id: string | number;
  x: number;
};

export type RenderBar<DATA = BarDefinition> = (v: {
  data: DATA;
  position: Position;
  width: number;
}) => ReactNode;

export type RenderInvalidBar = (v: {
  creation: CreationData | null;
  rowHeight: number;
}) => ReactNode;

export type ChartProps = {
  bars: BarDefinition[];
  onBarsChange?: (type: 'add' | 'update', bar: BarDefinition) => void;
  dependencies?: DependenceDefinition[];
  onDependenciesChange?: (
    type: 'add' | 'remove',
    dep: DependenceDefinition,
  ) => void;
  onDependenceClick?: (data: DependenceDefinition) => void;
  lines?: LineDefinition[];

  minWidth?: number;
  rowHeight: number;

  renderBar?: RenderBar;
  renderInvalidBar?: RenderInvalidBar;
  renderDependence?: (data: DependenceDefinition) => ReactNode;
  renderAbove?: () => ReactNode;

  apiRef?: RefObject<ChartApi>;
};
