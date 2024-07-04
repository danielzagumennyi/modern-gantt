import { uniq } from "lodash-es";
import { useCallback } from "react";
import { Coordinates } from "../chart/helpers/coordinates/types";
import { Position, Side } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { useDragController } from "./useDragController";

export const useResizeHandle = ({
  id,
  side,
}: {
  id: string | number;
  side: Side;
}) => {
  const { useStore } = useChartStore();

  const startResizing = useCallback(
    (id: string | number, side: Side, coords: Coordinates) => {
      useStore.setState((prev) => {
        return {
          ...prev,
          resizing: {
            id,
            side,
          },
          selected: uniq([...prev.selected, id]),
          initialCoordinates: coords,
        };
      });
    },
    [useStore]
  );

  const { listeners } = useDragController({
    onStart: ({ coords }) => {
      startResizing(id, side, coords);
    },
    onMove: ({ deltaX }) => {
      const store = useStore.getState();

      const { resizing } = store;
      if (!resizing) return;

      const position = store.originalPositions[resizing.id];
      if (!position) return;

      useStore.setState((store) => {
        const offsetX1 = resizing.side === "start" ? deltaX : 0;
        const offsetX2 = resizing.side === "end" ? deltaX : 0;

        const newX1 = position.x1 + offsetX1;
        const newX2 = position.x2 + offsetX2;

        const newPosition: Position = {
          x1: newX1 > position.x2 ? position.x2 : newX1,
          x2: newX2 < position.x1 ? position.x1 : newX2,
          y1: position.y1,
          y2: position.y2,
        };

        return {
          ...store,
          overridePositions: {
            ...store.overridePositions,
            [resizing.id]: newPosition,
          },
        };
      });
    },
    onEnd: () => {
      const store = useStore.getState();

      const {
        resizing,
        bars: data,
        overridePositions,
        onBarsChange: onChange,
      } = store;

      if (!resizing) return;

      const position = overridePositions[resizing.id];

      if (position) {
        const updatedData = data.map((item) => {
          return item.id === resizing.id ? { ...item, ...position } : item;
        });

        onChange?.(updatedData);
      }

      useStore.setState((store) => {
        if (!store.resizing) return store;

        return {
          ...store,
          overridePositions: {
            ...store.overridePositions,
            [store.resizing.id]: undefined,
          },
          selected: store.selected.filter((id) => id !== store.resizing?.id),
          resizing: null,
        };
      });
    },
  });

  return {
    listeners,
  };
};
