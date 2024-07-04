import { useCallback } from "react";
import { Coordinates } from "../chart/helpers/coordinates/types";
import { Side } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { useDragController } from "./useDragController";

export const useConnectHandle = ({
  id,
  side,
}: {
  id: string | number;
  side: Side;
}) => {
  const { useStore } = useChartStore();

  const startConnecting = useCallback(
    (id: string | number, side: Side, coords: Coordinates) => {
      const { originalPositions, rowHeight } = useStore.getState();

      const pos = originalPositions[id];
      if (!pos) return;

      const x = side === "start" ? pos.x1 : pos.x2;
      const y = pos.y1 + rowHeight / 2;

      useStore.setState({
        initialCoordinates: coords,
        connecting: {
          x,
          y,
          from: id,
          fromSide: side,
          to: null,
          toSide: null,
        },
      });
    },
    [useStore]
  );

  const { listeners } = useDragController({
    onStart: ({ coords }) => {
      startConnecting(id, side, coords);
    },
    onMove: ({ deltaX, deltaY }) => {
      const store = useStore.getState();

      const { connecting, originalPositions, rowHeight } = store;
      if (!connecting) return store;

      const pos = originalPositions[connecting.from];
      if (!pos) return;

      const x = connecting.fromSide === "start" ? pos.x1 : pos.x2;
      const y = pos.y1 + rowHeight / 2;

      useStore.setState((store) => {
        return {
          ...store,
          connecting: {
            ...connecting,
            x: x + deltaX,
            y: y + deltaY,
          },
        };
      });
    },
    onEnd: () => {
      const store = useStore.getState();

      const {
        connecting: connection,
        onDependenciesChange,
        dependencies,
      } = store;

      if (!connection) return;

      if (connection.to && connection.toSide) {
        onDependenciesChange?.([
          ...(dependencies || []),
          {
            from: connection.from,
            fromSide: connection.fromSide,
            to: connection.to,
            toSide: connection.toSide,
          },
        ]);
      }

      useStore.setState((store) => {
        if (!store.connecting) return store;

        return {
          ...store,
          connecting: null,
        };
      });
    },
  });

  return {
    listeners,
    // {
    //   onMouseDown,
    //   onTouchStart,
    //   onMouseEnter: onEnter,
    //   onMouseLeave: onLeave,
    //   onPointerEnter: onEnter,
    //   onPointerLeave: onLeave,
    // },
  };
};
