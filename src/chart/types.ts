import { ReactNode } from "react";
import { IAirTableColumnDef } from "../airTable/AirTable";

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

export type DraggingData = {
  id: string | number;
};

export type DependenceDefinition = {
  from: string | number;
  fromSide: Side;
  to: string | number;
  toSide: Side;
};

export type Side = "start" | "end";

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

export type ChartProps = {
  bars: BarDefinition[];
  onBarsChange?: (type: "add" | "update", bar: BarDefinition) => void;
  dependencies?: DependenceDefinition[];
  onDependenciesChange?: (
    type: "add" | "remove",
    dep: DependenceDefinition
  ) => void;
  lines?: LineDefinition[];

  columns?: IAirTableColumnDef<BarDefinition>[];
  maxSidebarWidth?: number;
  minSidebarWidth?: number;

  rowHeight: number;

  renderBar?: RenderBar;
  renderDependence?: (data: DependenceDefinition) => ReactNode;
  renderAbove?: () => ReactNode;
};
