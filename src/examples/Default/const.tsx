import { addDays, subDays } from "date-fns";
import { IAirTableColumnDef } from "../../airTable/types";
import { Item } from "./types";
import { GanttBarDefinition } from "../../gantt";

export const columns: IAirTableColumnDef<Item>[] = [
  {
    field: "name",
    header: "Название",
    render: (v) => {
      return <div>{v.title}</div>;
    },
  },
  {
    field: "type",
    header: "Тип",
    render: (v) => {
      return <div>{v.type}</div>;
    },
  },
  {
    field: "status",
    header: "Статус",
    render: (v) => {
      return (
        <div
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {v.status}
        </div>
      );
    },
  },
  {
    field: "priority",
    header: "Приоритет",
    render: (v) => {
      return <div>{v.priority}</div>;
    },
  },
  {
    field: "performer",
    header: "Исполнитель",
    render: (v) => {
      return <div>{v.performer}</div>;
    },
  },
];
export const bars: (Item & GanttBarDefinition)[] = [
  {
    id: 1,
    start: subDays(new Date(), 3),
    end: addDays(new Date(), 3),
    title: "First",
    type: "Project",
    status: "To Do",
    priority: "Low",
    performer: "John Doe",
  },
  {
    id: 2,
    start: subDays(new Date(), 3),
    end: addDays(new Date(), 3),
    title: "Second",
    type: "Sprint",
    status: "In Progress",
    priority: "Medium",
    performer: "John Doe",
  },
  {
    id: 3,
    start: subDays(new Date(), 3),
    end: addDays(new Date(), 3),
    title: "Third",
    type: "Task",
    status: "Closed",
    priority: "Hard",
    performer: "John Doe",
  },
];
