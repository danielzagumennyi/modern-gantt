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

    const scrollContainer = containerElement;

    if (!scrollContainer) {
      return;
    }

    const isScrolledToLeft = scrollContainer.scrollLeft <= 100;
    const isScrolledToRight =
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth - 100;

    if (isScrolledToLeft || isScrolledToRight) {
      return;
    }

    const direction = side === "end" ? Direction.Forward : Direction.Backward;

    scrollContainer.scrollBy({
      left: 100 * direction,
    });

    const store = useStore.getState();

    const { dragging } = store;
    if (!dragging) return;

    const position = store.overridePositions[dragging.id];
    if (!position) return;

    useStore.setState((store) => {
      const newPosition: Position = {
        x1: position.x1 + 100 * direction,
        x2: position.x2 + 100 * direction,
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
        background: isOver ? "rgba(50, 150, 100, 0.1)" : "rgba(0, 0, 0, 0.1)",
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
