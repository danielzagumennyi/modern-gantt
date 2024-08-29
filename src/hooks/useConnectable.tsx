import { useEffect, useRef, useState } from "react";
import { getEventCoordinates } from "../chart/helpers/coordinates/getEventCoordinates";
import { ConnectingData, Side } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { useEvent } from "./useEvent";
import { isPointWithinRect } from "../chart/helpers";
import { useWindowEvent } from "./useWindowEvent";

export type useConnectableProps = () => boolean;

export const useConnectable = <T extends HTMLElement>({
  id,
  side,
  onConnect,
}: {
  id: string | number;
  side: Side;
  onConnect?: (data: Pick<ConnectingData, "from" | "fromSide">) => boolean;
}) => {
  const { useStore, useProps } = useChartStore();

  const dependencies = useProps((s) => s.dependencies);

  const isAvailable = useStore((s) => {
    return !dependencies?.some((d) => {
      const con = s.connecting;
      return (
        con?.from === d.from &&
        con.fromSide === d.fromSide &&
        d.to === id &&
        d.toSide === side
      );
    });
  });

  const [isOver, setIsOver] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const { connecting } = useStore.getState();

    if (
      isOver &&
      connecting &&
      connecting.to !== id &&
      connecting.toSide !== side
    ) {
      useStore.setState((prev) => ({
        ...prev,
        connecting: {
          ...connecting,
          to: id,
          toSide: side,
        },
      }));

      return;
    }

    if (
      !isOver &&
      connecting &&
      connecting.to === id &&
      connecting.toSide === side
    ) {
      useStore.setState((prev) => ({
        ...prev,
        connecting: {
          ...connecting,
          to: null,
          toSide: null,
        },
      }));
    }
  }, [id, isOver, side, useStore]);

  const checkMousePosition = useEvent((event: MouseEvent) => {
    const check = () => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return false;

      const coords = getEventCoordinates(event);
      if (!coords) return false;

      const { connecting } = useStore.getState();
      if (!connecting) return false;
      if (connecting.from === id) return false;

      const isWithin = isPointWithinRect(coords, rect);
      if (!isWithin) return false;

      if (!onConnect) return true;

      const isValid = onConnect({
        from: connecting.from,
        fromSide: connecting.fromSide,
      });

      return isValid;
    };

    setIsOver(check());
  });

  const handleCancel = useEvent(() => {
    setIsOver(false);
  });

  useWindowEvent("pointermove", checkMousePosition);
  useWindowEvent("pointerup", handleCancel);

  return { ref, isOver, isAvailable };
};
