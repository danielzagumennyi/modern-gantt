import {
  differenceInDays,
  eachDayOfInterval,
  endOfQuarter,
  getDaysInMonth,
  getDaysInYear,
  isToday,
  isWeekend,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { formatters } from "./const";
import { GanttViewType } from "../../types";
import { HeaderGroup } from "./types";
import { calculateCoordinate } from "../../helpers";

type Params = {
  minDate: Date;
  maxDate: Date;
  viewType: GanttViewType;
  intervalWidth: number;
};

export const getCells = ({
  minDate,
  maxDate,
  viewType,
  intervalWidth,
}: Params) => {
  const daysOfInterval = eachDayOfInterval({
    start: minDate,
    end: maxDate,
  });

  const days = daysOfInterval.map<HeaderGroup>((date) => ({
    left: calculateCoordinate(date, intervalWidth) || 0,
    date: date,
    today: isToday(date),
    weekend: isWeekend(date),
    title: formatters[viewType](date),
    days: 0,
  }));

  const _groupCells = groupCells(days, viewType, intervalWidth);

  return _groupCells;
};

export const groupCells = (
  cells: HeaderGroup[],
  groupBy: GanttViewType,
  intervalWidth: number,
) => {
  const relatedFunc = {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
    quarter: startOfQuarter,
    year: startOfYear,
  };
  const getDateFunc = {
    day: () => 1,
    week: () => 7,
    month: getDaysInMonth,
    quarter: getDaysInQuarter,
    year: getDaysInYear,
  };

  const groups = cells.reduce<Record<number, HeaderGroup>>((acc, item) => {
    const date = relatedFunc[groupBy](item.date);
    const id = date.getTime();

    if (!acc[id]) {
      acc[id] = {
        ...item,
        left: calculateCoordinate(date, intervalWidth) || 0,
        date: date,
        title: formatters[groupBy](date),
        days: getDateFunc[groupBy](date),
      };
    }

    // acc[id].days++;

    return acc;
  }, {});

  return Object.values(groups);
};

const getDaysInQuarter = (date: Date) =>
  differenceInDays(endOfQuarter(date), startOfQuarter(date)) + 1;
