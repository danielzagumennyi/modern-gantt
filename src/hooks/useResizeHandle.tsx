import { useCallback } from 'react';

import { uniq } from 'lodash-es';

import { Side } from '../chart/types';
import { useChartStore } from '../chart/useChartStore';
import { getRelativeBoardPosition } from './getRelativeBoardPosition';
import { useDragController } from './useDragController';

export const useResizeHandle = ({
  id,
  side,
}: {
  id: string | number;
  side: Side;
}) => {
  const { useStore, useProps } = useChartStore();
  const containerElement = useStore((s) => s.containerElement);
  const maxX = useStore((s) => s.maxX);

  const startResizing = useCallback(
    (id: string | number, side: Side) => {
      useStore.setState((prev) => {
        return {
          ...prev,
          resizing: {
            id,
            side,
          },
          selected: uniq([...prev.selected, id]),
          overridePositions: {
            ...prev.overridePositions,
            [id]: prev.positions[id],
          },
        };
      });
    },
    [useStore],
  );

  const { listeners } = useDragController({
    onStart: () => {
      startResizing(id, side);
    },
    onMove: ({ coords }) => {
      const store = useStore.getState();
      const props = useProps.getState();

      const { resizing } = store;
      if (!resizing) return;

      const position = store.overridePositions[resizing.id];
      if (!position) return;

      useStore.setState((store) => {
        const newPosition = getRelativeBoardPosition({
          position,
          side: resizing.side,
          minWidth: props.minWidth || 0,
          containerElement: containerElement || document.body,
          maxX,
          coords,
        });

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
      const props = useProps.getState();

      const { bars, onBarsChange } = props;
      const { resizing, overridePositions } = store;

      if (!resizing) return;

      const position = overridePositions[resizing.id];

      if (position) {
        const item = bars.find((item) => {
          return item.id === resizing.id;
        });

        if (!item) return;

        onBarsChange?.('update', { ...item, ...position });
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
