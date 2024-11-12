import {
  addDays,
  differenceInDays,
  isDate,
  isValid,
  startOfDay,
} from "date-fns";
import { isNumberValue } from "../chart/helpers";

export const initialDate = startOfDay(new Date());

export const calculateDate = (
  x: number | null,
  intervalWidth: number,
  sub?: boolean
) => {
  if (!isNumberValue(x)) return null;

  const resultDate = addDays(
    initialDate,
    (sub ? x - intervalWidth : x) / intervalWidth
  );

  return startOfDay(resultDate);
};

export const calculateCoordinate = (
  targetDate: Date | null,
  intervalWidth: number,
  add?: boolean
): number | null => {
  if (!isDate(targetDate) || !isValid(targetDate)) return null;

  const days = differenceInDays(startOfDay(targetDate), initialDate);

  return (add ? days + 1 : days) * intervalWidth;
};
