import { BarDefinition, DependenceDefinition } from "../chart/types";

export type GanttBarDefinition = Omit<BarDefinition, "x1" | "x2"> & {
  start: Date | null;
  end: Date | null;
};

export type GanttDependenceDefinition = DependenceDefinition;

export type GanttViewType =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";
