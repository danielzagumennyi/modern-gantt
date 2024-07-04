import { getEventCoordinates } from "../chart/helpers/coordinates/getEventCoordinates";
import { Coordinates } from "../chart/helpers/coordinates/types";
import { useEvent } from "./useEvent";

type EventData = {
  startCoords: Coordinates;
  coords: Coordinates;
  deltaX: number;
  deltaY: number;
  event: PointerEvent;
};

let startCoords: Coordinates = { x: 0, y: 0 };

export const useDragController = ({
  onStart,
  onMove,
  onEnd,
}: {
  onStart?: ({ startCoords, coords, deltaX, deltaY, event }: EventData) => void;
  onMove?: ({ startCoords, coords, deltaX, deltaY, event }: EventData) => void;
  onEnd?: ({ startCoords, coords, deltaX, deltaY, event }: EventData) => void;
}) => {
  const handleMove = useEvent((event: PointerEvent) => {
    const coords = getEventCoordinates(event);
    if (!coords) return;
    const deltaX = coords.x - startCoords.x;
    const deltaY = coords.y - startCoords.y;

    onMove?.({ startCoords, coords, deltaX, deltaY, event });
  });

  const handleEnd = useEvent((event: PointerEvent) => {
    const coords = getEventCoordinates(event);
    if (!coords) return;
    const deltaX = coords.x - startCoords.x;
    const deltaY = coords.y - startCoords.y;

    document.removeEventListener("pointermove", handleMove);
    document.removeEventListener("pointerup", handleEnd);

    onEnd?.({ startCoords, coords, deltaX, deltaY, event });
  });

  const handleStart = useEvent<React.PointerEventHandler>((event) => {
    event.stopPropagation();

    const coords = getEventCoordinates(event.nativeEvent);
    if (!coords) return;
    startCoords = coords;

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleEnd);

    onStart?.({
      coords,
      startCoords: startCoords,
      deltaX: 0,
      deltaY: 0,
      event: event.nativeEvent,
    });
  });

  return {
    listeners: { onPointerDown: handleStart },
  };
};
