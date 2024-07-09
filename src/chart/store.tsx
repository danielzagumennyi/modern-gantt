import { create, StoreApi, UseBoundStore } from "zustand";
import {
  ChartProps,
  ConnectingData,
  DraggingData,
  Position,
  ResizingData,
} from "./types";

export type UseStore = UseBoundStore<StoreApi<Store>>;
export type UseProps = UseBoundStore<StoreApi<ChartProps>>;

export type Store = {
  containerWidth: number;
  containerHeight: number;
  maxX: number;

  selected: (string | number)[];

  originalPositions: Partial<Record<number | string, Position>>;
  overridePositions: Partial<Record<number | string, Position>>;
  positions: Partial<Record<number | string, Position>>;

  connecting: ConnectingData | null;
  dragging: DraggingData | null;
  resizing: ResizingData | null;

  elements: Partial<Record<number | string, HTMLElement>>;
  containerElement: HTMLElement | null;

  padding: number;
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

export type ChartApi = ReturnType<typeof createApi>;

const defaultStore: Store = {
  padding: 100,
  containerElement: null,
  elements: {},

  resizing: null,
  dragging: null,

  maxX: 0,

  containerWidth: 0,
  containerHeight: 0,
  selected: [],
  connecting: null,

  originalPositions: {},
  overridePositions: {},
  positions: {},
};

const defaultProps: ChartProps = {
  rowHeight: 0,
  bars: [],
};

export const createChartStore = () => {
  const chartStore = create<Store>(() => defaultStore);
  const propsStore = create<ChartProps>(() => defaultProps);
  return {
    useStore: chartStore,
    useProps: propsStore,
    api: createApi(chartStore),
  };
};
