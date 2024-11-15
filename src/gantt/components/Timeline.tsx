import {
  eachDayOfInterval,
  endOfWeek,
  format,
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

import { useVirtualizer } from "@tanstack/react-virtual";
import styles from "./Timeline.module.css";

type HeaderGroup = {
  title: string;
  date: Date;
  left: number;
  days: number;
  width: number;
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

    const scrollContainer = useStore((s) => s.containerElement);

    const headersVirtual = useVirtualizer({
      count: headers.length,
      horizontal: true,
      getScrollElement: () => scrollContainer,
      estimateSize: (el) => headers[el].width,
    });

    const cellsVirtual = useVirtualizer({
      count: cells.length,
      horizontal: true,
      getScrollElement: () => scrollContainer,
      estimateSize: (el) => cells[el].width,
    });

    return (
      <>
        {headersVirtual.getVirtualItems().map((item) => (
          <div
            key={item.key}
            className={styles.cell}
            style={{
              transform: `translateX(${item.start}px)`,
              width: item.size,
              left: 0,
              top: 0,
              position: "absolute",
            }}
          >
            {headers[item.index].title}
          </div>
        ))}

        {cellsVirtual.getVirtualItems().map((item) => (
          <div
            key={item.key}
            className={styles.cell}
            style={{
              transform: `translateX(${item.start}px)`,
              width: item.size,
              left: 0,
              position: "absolute",
              top: cellTop,
              height: cellHeight,
            }}
          >
            {cells[item.index].title}
          </div>
        ))}
      </>
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
    title: formatters[viewType](date),
    days: 0,
    get width() {
      return this.days * intervalWidth;
    },
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
        get width() {
          return this.days * intervalWidth;
        },
      };
    }

    acc[id].days++;

    return acc;
  }, {});

  return Object.values(groups);
};
