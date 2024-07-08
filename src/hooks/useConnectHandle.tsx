import { getRelativeMousePosition } from "../chart/helpers";
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

  const { listeners } = useDragController({
    onStart: ({ coords, event }) => {
      const { originalPositions, elements } = useStore.getState();

      const element = elements[id];
      if (!element) return;

      const pos = originalPositions[id];
      if (!pos) return;

      const offset = getRelativeMousePosition(element, event);

      const x = pos.x1 + offset.x;
      const y = pos.y1 + offset.y;

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
    onMove: ({ movementX, movementY }) => {
      const store = useStore.getState();

      const { connecting, originalPositions } = store;
      if (!connecting) return store;

      const pos = originalPositions[connecting.from];
      if (!pos) return;

      useStore.setState((store) => {
        return {
          ...store,
          connecting: {
            ...connecting,
            x: connecting.x + movementX,
            y: connecting.y + movementY,
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

  return listeners;
};
