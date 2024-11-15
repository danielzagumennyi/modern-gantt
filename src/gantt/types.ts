import { ReactNode } from "react";
import { BarDefinition, DependenceDefinition, Position } from "../chart/types";

export type GanttBarDefinition = Omit<BarDefinition, "x1" | "x2"> & {
  start: Date | null;
  end: Date | null;
};

export type GanttDependenceDefinition = DependenceDefinition;

export type GanttViewType = "day" | "week" | "month" | "quarter" | "year";

export type GanttRenderBar<DATA = BarDefinition> = (v: {
  data: DATA;
  position: Position;
  width: number;
  intervalWidth: number;
}) => ReactNode;
