import { Coordinates } from '../chart/helpers/coordinates/types';
import { Position, Side } from '../chart/types';

export const getRelativeBoardPosition = ({
  position,
  side,
  minWidth,
  containerElement,
  maxX,
  coords,
}: {
  position: Position;
  side: Side;
  minWidth: number;
  containerElement: HTMLElement;
  maxX: number;
  coords: Coordinates;
}): Position => {
  const xCordOnBoard =
    ((containerElement?.getBoundingClientRect().left || 0) +
      maxX -
      (containerElement?.scrollLeft || 0) -
      coords.x) *
    -1;

  const x1 = Math.min(
    side === 'start' ? xCordOnBoard : position.x1,
    position.x2 - (minWidth || 0),
  );
  const x2 = Math.max(
    side === 'end' ? xCordOnBoard : position.x2,
    position.x1 + (minWidth || 0),
  );

  return {
    ...position,
    x1,
    x2,
  };
};
