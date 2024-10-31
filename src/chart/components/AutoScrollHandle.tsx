import { useCallback, useEffect } from "react";
import { useInterval } from "../../hooks/useInterval";
import { useOver } from "../../hooks/useOver";
import { Position, Side } from "../types";
import { useChartStore } from "../useChartStore";
import { Direction } from "../helpers";

export const AutoScrollHandle = ({ side }: { side: Side }) => {
  const { useStore } = useChartStore();

  const { ref, isOver } = useOver<HTMLDivElement>();

  const [setAutoScrollInterval, clearAutoScrollInterval] = useInterval();

  const autoScroll = useCallback(() => {
    const { containerElement } = useStore.getState();

    const el = containerElement;

    if (!el) {
      return;
    }

    const leftDistance = Math.min(el.scrollLeft, 100);
    const rightDistance = Math.min(
      el.scrollWidth - el.clientWidth - el.scrollLeft,
      100
    );

    const direction = side === "end" ? Direction.Forward : Direction.Backward;
    const distance = side === "end" ? rightDistance : leftDistance;

    el.scrollBy({
      left: distance * direction,
    });

    const store = useStore.getState();

    const { dragging, resizing, connecting } = store;
    if (dragging) {
      const position = store.overridePositions[dragging.id];
      if (!position) return;

      useStore.setState((store) => {
        const newPosition: Position = {
          x1: position.x1 + distance * direction,
          x2: position.x2 + distance * direction,
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
      return;
    }

    if (resizing) {
      const position = store.overridePositions[resizing.id];
      if (!position) return;

      useStore.setState((store) => {
        const newPosition: Position = {
          x1: position.x1 - (resizing.side === "start" ? leftDistance : 0),
          x2: position.x2 + (resizing.side === "end" ? rightDistance : 0),
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
      return;
    }

    if (connecting) {
      const position = store.connecting;
      if (!position) return;

      useStore.setState((store) => {
        return {
          ...store,
          connecting: {
            ...connecting,
            x: connecting.x + distance * direction,
            y: connecting.y,
          },
        };
      });
      return;
    }
  }, [side, useStore]);

  useEffect(() => {
    if (isOver) {
      setAutoScrollInterval(autoScroll, 100);
    } else {
      clearAutoScrollInterval();
    }

    return clearAutoScrollInterval;
  }, [autoScroll, clearAutoScrollInterval, isOver, setAutoScrollInterval]);

  return (
    <div
      ref={ref}
      style={{
        pointerEvents: "none",
        // background: isOver ? "rgba(50, 150, 100, 0.1)" : "rgba(0, 0, 0, 0.1)",
        width: "min(10%, 50px)",
        position: "absolute",
        left: side === "start" ? 0 : undefined,
        right: side === "end" ? 0 : undefined,
        top: 0,
        bottom: 0,
      }}
    ></div>
  );
};
