import { GanttViewType } from "../../types";

export type HeaderGroup = {
  title: string;
  date: Date;
  left: number;
  days: number;
  weekend: boolean;
  today: boolean;
};

export interface ITimelineProps {
  viewType: GanttViewType;
  intervalWidth: number;
}
