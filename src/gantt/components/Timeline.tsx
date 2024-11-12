import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isToday,
  isWeekend,
  startOfDay,
  startOfHour,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { memo, useMemo } from "react";
import { useChartStore } from "../../chart/useChartStore";
import { calculateCoordinate, calculateDate } from "../helpers";
import { GanttViewType } from "../types";

import styles from "./Timeline.module.css";

type HeaderGroup = {
  title: string;
  date: Date;
  left: number;
  days: number;
};

const headerRelation: Record<GanttViewType, GanttViewType> = {
  day: "week",
  week: "month",
  month: "year",
  quarter: "year",
  year: "year",
};

export const Timeline = memo(
  ({
    viewType,
    intervalWidth,
  }: {
    viewType: GanttViewType;
    intervalWidth: number;
  }) => {
    const { useStore } = useChartStore();

    const maxX = useStore((s) => s.maxX);

    const minDate = calculateDate(-maxX, intervalWidth);
    const maxDate = calculateDate(maxX, intervalWidth);

    const headers = useMemo<HeaderGroup[]>(() => {
      if (viewType === "year") return [];
      if (!minDate || !maxDate) return [];

      const cells = getCells({
        minDate,
        maxDate,
        viewType: headerRelation[viewType],
        intervalWidth,
      });

      return cells;
    }, [intervalWidth, maxDate, minDate, viewType]);

    const cells = useMemo<HeaderGroup[]>(() => {
      if (!minDate || !maxDate) return [];

      const cells = getCells({
        minDate,
        maxDate,
        viewType,
        intervalWidth,
      });

      return cells;
    }, [intervalWidth, maxDate, minDate, viewType]);

    const cellHeight = viewType === "year" ? "100%" : "50%";
    const cellTop = viewType === "year" ? 0 : "50%";

    return (
      <div className={styles.root}>
        {headers.map((item) => {
          return (
            <div
              key={item.date.getTime()}
              className={styles.cell}
              style={{
                left: item.left,
                width: intervalWidth * item.days,
              }}
            >
              {item.title}
            </div>
          );
        })}
        {cells.map((item) => {
          return (
            <div
              key={item.date.getTime()}
              className={styles.cell}
              style={{
                top: cellTop,
                height: cellHeight,
                left: item.left,
                width: intervalWidth * item.days,
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    );
  }
);

const formatters: Record<GanttViewType, (d: Date) => string> = {
  day: (date: Date) => format(date, "dd"),
  week: (date: Date) =>
    format(date, "dd MMM") + " - " + format(endOfWeek(date), "dd MMM"),
  month: (date: Date) => format(date, "MMM, yyyy"),
  quarter: (date: Date) => format(date, "QQQ"),
  year: (date: Date) => format(date, "yyyy"),
};

const getCells = ({
  minDate,
  maxDate,
  viewType,
  intervalWidth,
}: {
  minDate: Date;
  maxDate: Date;
  viewType: GanttViewType;
  intervalWidth: number;
}) => {
  const days = eachDayOfInterval({
    start: minDate,
    end: maxDate,
  }).map<HeaderGroup>((date) => ({
    left: calculateCoordinate(date, intervalWidth) || 0,
    date: date,
    today: isToday(date),
    weekend: isWeekend(date),
    title: formatters[viewType](date),
    days: 0,
  }));

  return groupCells(days, viewType, intervalWidth);
};

const groupCells = (
  cells: HeaderGroup[],
  groupBy: GanttViewType,
  intervalWidth: number
) => {
  const relatedFunc = {
    hour: startOfHour,
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth,
    quarter: startOfQuarter,
    year: startOfYear,
  };

  const groups = cells.reduce<Record<number, HeaderGroup>>((acc, item) => {
    const date = relatedFunc[groupBy](item.date);
    const id = date.getTime();

    if (!acc[id]) {
      acc[id] = {
        left: calculateCoordinate(date, intervalWidth) || 0,
        date: date,
        title: formatters[groupBy](date),
        days: 0,
      };
    }

    acc[id].days++;

    return acc;
  }, {});

  return Object.values(groups);
};
