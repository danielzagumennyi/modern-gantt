import { uniq } from "lodash-es";
import { useCallback } from "react";
import { Position } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { useDragController } from "./useDragController";

export const useDragHandle = ({ id }: { id: string | number }) => {
  const { useStore, useProps } = useChartStore();

  const startDragging = useCallback(
    (id: string | number) => {
      useStore.setState((prev) => {
        return {
          ...prev,
          dragging: { id },
          selected: uniq([...prev.selected, id]),
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
    onStart: () => {
      startDragging(id);
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
      const props = useProps.getState();

      const { bars, onBarsChange } = props;
      const { dragging, overridePositions } = store;

      if (!dragging) return;

      const position = overridePositions[dragging.id];
      if (position) {
        const updatedData = bars.map((item) => {
          return item.id === dragging.id ? { ...item, ...position } : item;
        });
        onBarsChange?.(updatedData);
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

  return listeners;
};
