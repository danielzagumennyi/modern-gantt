import { DependenceDefinition } from "../chart/types";

export type GanttBarDefinition = {
  id: string | number;
  start: Date | null;
  end: Date | null;
  isGroup?: boolean;
  children?: GanttBarDefinition[];
};

export type GanttDependenceDefinition = DependenceDefinition;

export type GanttViewType =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";
