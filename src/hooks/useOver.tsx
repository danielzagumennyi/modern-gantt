import { useWindowEvent } from "@mantine/hooks";
import { useRef, useState } from "react";
import { isPointWithinRect } from "../chart/helpers";
import { getEventCoordinates } from "../chart/helpers/coordinates/getEventCoordinates";
import { useEvent } from "./useEvent";

export type useConnectableProps = () => boolean;

export const useOver = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [isOver, setIsOver] = useState(false);

  const checkMousePosition = useEvent((event: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const coords = getEventCoordinates(event);
    if (!coords) return;

    const isWithin = isPointWithinRect(coords, rect);

    setIsOver(isWithin);
  });

  const handleCancel = useEvent(() => {
    setIsOver(false);
  });

  useWindowEvent("pointermove", checkMousePosition);
  useWindowEvent("pointerup", handleCancel);

  return { ref, isOver };
};
