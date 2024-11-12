import { startOfDay } from "date-fns";
import { isNumber } from "lodash-es";
import { CSSProperties } from "react";
import { Coordinates } from "./helpers/coordinates/types";
import { Position } from "./types";

export const initialDate = startOfDay(new Date());

export const convertPositionToStyle = (pos: Position | null) => {
  if (!pos) return {};

  const style: CSSProperties = {
    transform: `translateX(${pos.x1}px)`,
    width: `${pos.x2 - pos.x1}px`,
  };

  return style;
};

export const isNumberValue = (value: unknown): value is number => {
  return isNumber(value) && !isNaN(value);
};

export const generatePathString = (points: Coordinates[]) => {
  return points.reduce((acc, p, i) => {
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

export const isPointWithinRect = (
  point: Coordinates,
  rect: DOMRect
): boolean => {
  const { x, y } = point;
  const { top, left, bottom, right } = rect;
  return top <= y && y <= bottom && left <= x && x <= right;
};

export const preventDefault = (e: Event) => e.preventDefault();
