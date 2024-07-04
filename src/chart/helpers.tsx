import { startOfDay } from "date-fns";
import { isNumber } from "lodash-es";
import { CSSProperties } from "react";
import { Coordinates } from "./helpers/coordinates/types";
import { Position, Side } from "./types";

export const initialDate = startOfDay(new Date());

export const convertPositionToStyle = (position: Position | null) => {
  if (!position) return {};

  const style: CSSProperties = {
    transform: `translateX(${position.x1}px)`,
    width: `${position.x2 - position.x1}px`,
  };

  return style;
};

export const isNumberValue = (value: unknown): value is number => {
  return isNumber(value) && !isNaN(value);
};

export const generatePath = ({
  endPoint,
  offset,
  startPoint,
  endSide,
  startSide,
}: {
  startPoint: Coordinates;
  endPoint: Coordinates;
  startSide: Side;
  endSide: Side;
  offset: number;
  rowHeight: number;
}) => {
  const getPoints = () => {
    const direction =
      startSide === "end" ? Direction.Forward : Direction.Backward;

    if (startSide === "start" && endSide === "start") {
      return [
        startPoint,
        {
          x: Math.min(startPoint.x, endPoint.x) + offset * direction,
          y: startPoint.y,
        },
        {
          x: Math.min(startPoint.x, endPoint.x) + offset * direction,
          y: endPoint.y,
        },
        endPoint,
      ];
    }

    if (startSide === "end" && endSide === "end") {
      return [
        startPoint,
        {
          x: Math.max(startPoint.x, endPoint.x) + offset * direction,
          y: startPoint.y,
        },
        {
          x: Math.max(startPoint.x, endPoint.x) + offset * direction,
          y: endPoint.y,
        },
        endPoint,
      ];
    }

    if (
      startSide === "start" &&
      endSide === "end" &&
      startPoint.x < endPoint.x &&
      Math.abs(startPoint.x - endPoint.x) >= offset * 2
    ) {
      return [
        startPoint,
        // { x: endPoint.x, y: 50 },
        // { x: endPoint.x, y: endPoint.y },
        // { x: endPoint.x - offset, y: endPoint.y },
        endPoint,
      ];
    }

    if (Math.abs(startPoint.x - endPoint.x) >= offset * 2) {
      return [
        startPoint,
        {
          x: startPoint.x + offset * direction,
          y: startPoint.y,
        },
        {
          x: startPoint.x + offset * direction,
          y: endPoint.y,
        },
        endPoint,
      ];
    }

    return [];
  };

  return getPoints().reduce((acc, p, i) => {
    if (i === 0) {
      acc += `M${p.x} ${p.y}`;
    } else {
      acc += `H${p.x} V${p.y}`;
    }

    return acc;
  }, "");
};

export enum Direction {
  Forward = 1,
  Backward = -1,
}

export const getRelativeMousePosition = (
  element: Element,
  e: MouseEvent
): Coordinates => {
  const rect = element.getBoundingClientRect();
  return { x: e.clientX - rect.x, y: e.clientY - rect.y };
};
