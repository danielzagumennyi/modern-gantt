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
  const { useStore, useProps } = useChartStore();

  const { listeners } = useDragController({
    onStart: ({ event }) => {
      const { originalPositions, elements } = useStore.getState();

      const element = elements[id];
      if (!element) return;

      const pos = originalPositions[id];
      if (!pos) return;

      const offset = getRelativeMousePosition(element, event);

      const x = pos.x1 + offset.x;
      const y = pos.y1 + offset.y;

      useStore.setState({
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
      const props = useProps.getState();

      const { onDependenciesChange, dependencies } = props;
      const { connecting } = store;

      if (!connecting) return;

      if (connecting.to && connecting.toSide) {
        onDependenciesChange?.([
          ...(dependencies || []),
          {
            from: connecting.from,
            fromSide: connecting.fromSide,
            to: connecting.to,
            toSide: connecting.toSide,
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
