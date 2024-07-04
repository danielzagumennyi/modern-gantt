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
};

export type LineDefinition = {
  id: string | number;
  x: number;
};