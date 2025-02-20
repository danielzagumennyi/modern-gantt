import { GanttViewType } from "../../types";

export type HeaderGroup = {
  title: string;
  date: Date;
  left: number;
  days: number;
};

export interface ITimelineProps {
  viewType: GanttViewType;
  intervalWidth: number;
}
