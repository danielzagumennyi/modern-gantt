import {
  eachDayOfInterval,
  eachHourOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
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
import { calculateDateFromPixel } from "../helpers";
import { GanttViewType } from "../types";

import styles from "./Timeline.module.css";

type HeaderGroup = {
  title: string;
  date: Date;
  today?: boolean;
  weekend?: boolean;
  children?: HeaderGroup[];
};

export const Timeline = memo(
  ({
    viewType,
    groupBy,
    intervalWidth,
  }: {
    viewType: GanttViewType;
    groupBy?: GanttViewType;
    intervalWidth: number;
  }) => {
    const { useStore } = useChartStore();

    const maxX = useStore((s) => s.maxX);

    const minDate = calculateDateFromPixel(-maxX, intervalWidth, viewType);
    const maxDate = calculateDateFromPixel(maxX, intervalWidth, viewType);

    const groups = useMemo<HeaderGroup[]>(() => {
      if (!minDate || !maxDate) return [];

      const cells = getCells({
        minDate,
        maxDate,
        viewType,
      });

      if (groupBy) {
        const relatedFunc = {
          hour: startOfHour,
          day: startOfDay,
          week: startOfWeek,
          month: startOfMonth,
          quarter: startOfQuarter,
          year: startOfYear,
        };

        const groups = cells.reduce<Record<number, HeaderGroup>>(
          (acc, item) => {
            const date = relatedFunc[groupBy](item.date);
            const id = date.getTime();

            if (!acc[id]) {
              acc[id] = {
                date: date,
                title: formatters[groupBy](date),
                children: [],
              };
            }

            acc[id].children?.push(item);

            return acc;
          },
          {}
        );

        return Object.values(groups);
      }

      return cells;
    }, [groupBy, maxDate, minDate, viewType]);

    return (
      <div className={styles.root}>
        {groups.map((item) => {
          return (
            <div key={item.date.getTime()}>
              <div
                className={styles.cell}
                data-today={item.today}
                data-weekend={item.weekend}
                style={{
                  width: intervalWidth * (item.children?.length || 1),
                }}
              >
                {item.title}
              </div>
              <div className={styles.group}>
                {item.children?.map((item) => (
                  <div
                    className={styles.cell}
                    key={item.date.getTime()}
                    data-today={item.today}
                    data-weekend={item.weekend}
                    style={{
                      width: intervalWidth,
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

const formatters: Record<GanttViewType, (d: Date) => string> = {
  hour: (date: Date) => format(date, "aaa h"),
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
}: {
  minDate: Date;
  maxDate: Date;
  viewType: GanttViewType;
}) => {
  if (viewType === "hour") {
    return eachHourOfInterval({
      start: minDate,
      end: maxDate,
    }).map<HeaderGroup>((date) => {
      return {
        date: date,
        title: formatters[viewType](date),
      };
    });
  }

  if (viewType === "day") {
    return eachDayOfInterval({
      start: minDate,
      end: maxDate,
    }).map<HeaderGroup>((date) => ({
      date: date,
      today: isToday(date),
      weekend: isWeekend(date),
      title: formatters[viewType](date),
    }));
  }

  if (viewType === "week") {
    return eachWeekOfInterval({
      start: minDate,
      end: maxDate,
    }).map<HeaderGroup>((date) => {
      return {
        date: date,
        title: formatters[viewType](date),
      };
    });
  }

  if (viewType === "month") {
    return eachMonthOfInterval({
      start: minDate,
      end: maxDate,
    }).map<HeaderGroup>((date) => {
      return {
        date: date,
        title: formatters[viewType](date),
      };
    });
  }

  if (viewType === "quarter") {
    return eachQuarterOfInterval({
      start: minDate,
      end: maxDate,
    }).map<HeaderGroup>((date) => ({
      date: date,
      title: formatters[viewType](date),
    }));
  }

  if (viewType === "year") {
    return eachYearOfInterval({
      start: minDate,
      end: maxDate,
    }).map<HeaderGroup>((date) => {
      return {
        date: date,
        title: formatters[viewType](date),
      };
    });
  }

  return [];
};
