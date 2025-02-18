import { IAirTableColumnDef } from "../../airTable/types";
import { GanttBarDefinition } from "../../gantt";

export interface Item extends GanttBarDefinition {
  title: string;
  type: "Project" | "Sprint" | "Task";
  status: "To Do" | "Closed" | "In Progress";
  priority: "Low" | "Medium" | "Hard";
  performer: string;
}

export type Column = IAirTableColumnDef<Item>;
