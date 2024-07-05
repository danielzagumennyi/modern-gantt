import { uniq } from "lodash-es";
import { useCallback } from "react";
import { Coordinates } from "../chart/helpers/coordinates/types";
import { useChartStore } from "../chart/useChartStore";
import { useDragController } from "./useDragController";
import { Position } from "../chart/types";

export const useDragHandle = ({ id }: { id: string | number }) => {
  const { useStore } = useChartStore();

  const isDragging = useStore((s) => s.dragging?.id === id);

  const startDragging = useCallback(
    (id: string | number, coords: Coordinates) => {
      useStore.setState((prev) => {
        return {
          ...prev,
          dragging: { id },
          selected: uniq([...prev.selected, id]),
          initialCoordinates: coords,
          overridePositions: {
            ...prev.overridePositions,
            [id]: prev.positions[id],
          },
        };
      });
    },
    [useStore]
  );

  const { listeners } = useDragController({
    onStart: ({ coords }) => {
      startDragging(id, coords);
    },
    onMove: ({ movementX }) => {
      const store = useStore.getState();

      const { dragging } = store;
      if (!dragging) return;

      const position = store.overridePositions[dragging.id];
      if (!position) return;

      useStore.setState((store) => {
        const newPosition: Position = {
          x1: position.x1 + movementX,
          x2: position.x2 + movementX,
          y1: position.y1,
          y2: position.y2,
        };

        return {
          ...store,
          overridePositions: {
            ...store.overridePositions,
            [dragging.id]: newPosition,
          },
        };
      });
    },
    onEnd: () => {
      const store = useStore.getState();

      const {
        dragging,
        bars: data,
        overridePositions,
        onBarsChange: onChange,
      } = store;
      if (!dragging) return;

      const position = overridePositions[dragging.id];
      if (position) {
        const updatedData = data.map((item) => {
          return item.id === dragging.id ? { ...item, ...position } : item;
        });
        onChange?.(updatedData);
      }

      useStore.setState((store) => {
        if (!store.dragging) return store;
        return {
          ...store,
          overridePositions: {
            ...store.overridePositions,
            [store.dragging.id]: undefined,
          },
          selected: store.selected.filter((id) => id !== store.dragging?.id),
          dragging: null,
        };
      });
    },
  });

  return {
    isDragging,
    listeners,
  };
};
