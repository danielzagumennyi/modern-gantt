import { useChartStore } from "../chart/useChartStore";

export const useBarState = (id: number | string) => {
  const { useStore } = useChartStore();

  const state = useStore((s) => {
    if (s.dragging?.id === id) {
      return "dragging";
    }

    if (s.resizing?.id === id) {
      return "resizing-" + s.resizing.side;
    }

    if (s.connecting?.from === id) {
      return "connecting-" + s.connecting.fromSide;
    }

    if (s.connecting?.from && s.connecting.from !== id) {
      return "connectable";
    }

    return "idle";
  });

  return state;
};
