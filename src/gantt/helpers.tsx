import {
  addDays,
  addHours,
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInQuarters,
  differenceInWeeks,
  differenceInYears,
  isAfter,
  startOfDay,
} from "date-fns";
import { CSSProperties } from "react";
import { Position } from "../chart/types";
import { GanttViewType } from "./types";

export const initialDate = startOfDay(new Date());

export const convertPositionToStyle = (position: Position | null) => {
  if (!position) return {};

  const style: CSSProperties = {
    transform: `translateX(${position.x1}px)`,
    width: `${position.x2 - position.x1}px`,
  };

  return style;
};

export const sortDates = (dates: Date[]): Date[] =>
  [...dates].sort((a, b) => a.getTime() - b.getTime());

export const calculateDateFromPixel = (
  x: number,
  intervalWidth: number,
  viewType: GanttViewType
) => {
  const diff = x / intervalWidth;

  const relatedFunc = {
    hour: addHours,
    day: addDays,
    week: addWeeks,
    month: addMonths,
    quarter: addQuarters,
    year: addYears,
  };

  const resultDate = relatedFunc[viewType](initialDate, diff);

  return resultDate;
};

export const calculatePixelFromDate = (
  targetDate: Date | null,
  intervalWidth: number,
  viewType: GanttViewType
) => {
  if (!(targetDate instanceof Date)) {
    return null;
  }

  const relatedFunc = {
    hour: differenceInHours,
    day: differenceInDays,
    week: differenceInWeeks,
    month: differenceInMonths,
    quarter: differenceInQuarters,
    year: differenceInYears,
  };

  const diff = relatedFunc[viewType](initialDate, targetDate);

  const x = Math.abs(diff * intervalWidth);

  return isAfter(targetDate, initialDate) ? x : -x;
};

export function calculateCoordinate(
  targetDate: Date | null,
  intervalWidth: number,
  scale: GanttViewType
): number | null {
  if (!(targetDate instanceof Date)) {
    return null;
  }

  const msPerHour = 1000 * 60 * 60;
  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerWeek = msPerDay * 7;
  const msPerMonth = msPerDay * 30.4375; // Среднее количество дней в месяце
  const msPerQuarter = msPerDay * 91.3125; // Среднее количество дней в квартале
  const msPerYear = msPerDay * 365.25; // Среднее количество дней в году

  const scales: { [key in GanttViewType]: (diff: number) => number } = {
    hour: (diff) => diff / msPerHour,
    day: (diff) => diff / msPerDay,
    week: (diff) => diff / msPerWeek,
    month: (diff) => diff / msPerMonth,
    quarter: (diff) => diff / msPerQuarter,
    year: (diff) => diff / msPerYear,
  };

  const diff = targetDate.getTime() - initialDate.getTime();
  return scales[scale](diff) * intervalWidth;
}
