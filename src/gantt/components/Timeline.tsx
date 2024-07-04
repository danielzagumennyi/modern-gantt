import { Flex } from "@mantine/core";
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
import styled, { css } from "styled-components";
import { useChartStore } from "../../chart/useChartStore";
import { GanttViewType } from "../Gantt";
import { calculateDateFromPixel } from "../helpers";

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
  }: {
    viewType: GanttViewType;
    groupBy?: GanttViewType;
  }) => {
    const { useStore } = useChartStore();

    const intervalWidth = 50; // to do
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
      <div
        style={{
          display: "flex",
          width: maxX * 2,
        }}
      >
        {groups.map((item) => {
          return (
            <div key={item.date.getTime()}>
              <Cell
                $width={intervalWidth * (item.children?.length || 1)}
                $height={25}
                $today={item.today}
                $weekend={item.weekend}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                }}
              >
                {item.title}
              </Cell>
              <Flex>
                {item.children?.map((item) => (
                  <Cell
                    key={item.date.getTime()}
                    $width={intervalWidth}
                    $height={25}
                    $today={item.today}
                    $weekend={item.weekend}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                    }}
                  >
                    {item.title}
                  </Cell>
                ))}
              </Flex>
            </div>
          );
        })}
      </div>
    );
  }
);

const Cell = styled.div<{
  $width: number;
  $height: number;
  $today?: boolean;
  $weekend?: boolean;
}>`
  white-space: nowrap;
  border: 0.5px solid var(--mantine-color-gray-4);
  width: ${(p) => p.$width + "px"};
  height: ${(p) => p.$height + "px"};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  justify-content: center;
  overflow: hidden;

  ${(p) =>
    p.$weekend &&
    css`
      background-color: var(--mantine-color-red-0);
    `}

  ${(p) =>
    p.$today &&
    css`
      background-color: var(--mantine-color-blue-5);
      border-color: var(--mantine-color-blue-5);
      color: white;
    `}
`;

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
