import { endOfWeek, format } from "date-fns";
import { GanttViewType } from "../../types";

export const formatters: Record<GanttViewType, (d: Date) => string> = {
  day: (date: Date) => format(date, "dd"),
  week: (date: Date) =>
    format(date, "dd MMM") + " - " + format(endOfWeek(date), "dd MMM"),
  month: (date: Date) => format(date, "MMM, yyyy"),
  quarter: (date: Date) => format(date, "QQQ"),
  year: (date: Date) => format(date, "yyyy"),
};

export const headerRelation: Record<GanttViewType, GanttViewType> = {
  day: "week",
  week: "month",
  month: "year",
  quarter: "year",
  year: "year",
};
