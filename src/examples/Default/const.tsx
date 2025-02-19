import { addDays, subDays } from "date-fns";
import { IAirTableColumnDef } from "../../airTable/types";
import { Item } from "./types";
import { GanttBarDefinition } from "../../gantt";
import { Tooltip } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";

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
  {
    field: "GO_TO",
    header: "",
    width: 70,
    render: (v, { rowHovered }, api) => {
      console.log({ rowHovered, api });
      const labels: Record<Item["type"], string> = {
        Project: "Go to Project",
        Sprint: "Go to Sprint",
        Task: "Go to Task",
      };
      const handleScrollTo = () => api.scrollTo(v.id);
      return (
        <Tooltip label={labels[v.type]}>
          {rowHovered ? (
            <IconArrowNarrowRight cursor={"pointer"} onClick={handleScrollTo} />
          ) : (
            <div
              style={{
                width: 24,
              }}
            />
          )}
        </Tooltip>
      );
    },
  },
];
export const bars: (Item & GanttBarDefinition)[] = [
  {
    id: 1,
    start: subDays(new Date(), 0),
    end: addDays(new Date(), 3),
    title: "First",
    type: "Project",
    status: "To Do",
    priority: "Low",
    performer: "John Doe",
  },
  {
    id: 2,
    start: subDays(new Date(), -6),
    end: addDays(new Date(), 9),
    title: "Second",
    type: "Sprint",
    status: "In Progress",
    priority: "Medium",
    performer: "John Doe",
  },
  {
    id: 3,
    start: subDays(new Date(), -9),
    end: addDays(new Date(), 16),
    title: "Third",
    type: "Task",
    status: "Closed",
    priority: "Hard",
    performer: "John Doe",
  },
];
