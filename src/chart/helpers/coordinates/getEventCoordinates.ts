import { hasViewportRelativeCoordinates } from "../event/hasViewportRelativeCoordinates";
import { isTouchEvent } from "../event/isTouchEvent";
import type { Coordinates } from "./types";

/**
 * Returns the normalized x and y coordinates for mouse and touch events.
 */
export function getEventCoordinates(event: Event): Coordinates | null {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const { clientX: x, clientY: y } = event.touches[0];

      return {
        x,
        y,
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const { clientX: x, clientY: y } = event.changedTouches[0];

      return {
        x,
        y,
      };
    }
  }

  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  return null;
}
