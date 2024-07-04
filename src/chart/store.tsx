import { create, StoreApi, UseBoundStore } from "zustand";
import {
  BarDefinition,
  Position,
  DependenceDefinition,
  ResizingData,
  ConnectingData,
  DraggingData,
  LineDefinition,
} from "./types";
import { ReactNode } from "react";
import { HorizontalAxis } from "./components/HorizontalAxis";
import { ChartBar } from "./components/ChartBar";
import { Coordinates } from "./helpers/coordinates/types";
import { Dependence } from "./components/Dependence";

export type UseStore = UseBoundStore<StoreApi<Store>>;

export type Store = {
  renderDependence: (data: DependenceDefinition) => ReactNode;
  renderBar: (data: BarDefinition) => ReactNode;
  renderAbove?: () => ReactNode;

  rowHeight: number;

  containerWidth: number;
  containerHeight: number;
  maxX: number;
  minX: number;

  selected: (string | number)[];

  originalPositions: Partial<Record<number | string, Position>>;
  overridePositions: Partial<Record<number | string, Position>>;
  positions: Partial<Record<number | string, Position>>;

  connecting: ConnectingData | null;
  dragging: DraggingData | null;
  resizing: ResizingData | null;

  bars: BarDefinition[];
  onBarsChange?: (v: BarDefinition[]) => void;

  dependencies?: DependenceDefinition[];
  onDependenciesChange?: (v: DependenceDefinition[]) => void;

  lines?: LineDefinition[];

  initialCoordinates: Coordinates;

  elements: Partial<Record<number | string, HTMLElement>>;
};

export const createApi = (store: UseStore) => {
  const scrollTo = (id: string | number) => {
    store.getState().elements[id]?.scrollIntoView({
      inline: "center",
    });
  };

  return {
    scrollTo,
  };
};

const defaultStore: Store = {
  elements: {},

  initialCoordinates: { x: 0, y: 0 },

  resizing: null,
  dragging: null,

  maxX: 0,
  minX: 0,

  containerWidth: 0,
  containerHeight: 0,
  rowHeight: 0,
  lines: [],
  bars: [],
  selected: [],
  dependencies: [],
  connecting: null,

  originalPositions: {},
  overridePositions: {},
  positions: {},

  renderDependence: (data) => <Dependence data={data} />,
  renderBar: (data) => <ChartBar data={data} />,
  renderAbove: () => <HorizontalAxis />,
};

export const createChartStore = () => {
  const store = create<Store>(() => defaultStore);
  return {
    useStore: store,
    api: createApi(store),
  };
};
