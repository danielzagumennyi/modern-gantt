import { Tooltip } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { addDays, subDays } from 'date-fns';

import { GanttBarDefinition } from '../../gantt';
import { Column, Item } from './types';

export const columns: Column[] = [
  {
    field: 'name',
    header: 'Название',
    render: (v) => {
      return <div>{v.title}</div>;
    },
  },
  {
    field: 'type',
    header: 'Тип',
    render: (v) => {
      return <div>{v.type}</div>;
    },
  },
  {
    field: 'status',
    header: 'Статус',
    render: (v) => {
      return (
        <div
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {v.status}
        </div>
      );
    },
  },
  {
    field: 'priority',
    header: 'Приоритет',
    render: (v) => {
      return <div>{v.priority}</div>;
    },
  },
  {
    field: 'performer',
    header: 'Исполнитель',
    render: (v) => {
      return <div>{v.performer}</div>;
    },
  },
  {
    field: 'GO_TO',
    header: '',
    width: 70,
    render: (v, { rowHovered }) => {
      const labels: Record<Item['type'], string> = {
        Project: 'Go to Project',
        Sprint: 'Go to Sprint',
        Task: 'Go to Task',
      };
      return (
        <Tooltip label={labels[v.type]}>
          {rowHovered ? (
            <IconArrowNarrowRight cursor={'pointer'} />
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
    title: 'First',
    type: 'Project',
    status: 'To Do',
    priority: 'Low',
    performer: 'John Doe',
  },
  {
    id: 2,
    start: null,
    end: null,
    title: 'Second',
    type: 'Sprint',
    status: 'In Progress',
    priority: 'Medium',
    performer: 'John Doe',
  },
  {
    id: 3,
    start: subDays(new Date(), -9),
    end: addDays(new Date(), 16),
    title: 'Third',
    type: 'Task',
    status: 'Closed',
    priority: 'Hard',
    performer: 'John Doe',
  },
  {
    id: 4,
    start: subDays(new Date(), 5),
    end: addDays(new Date(), 2),
    title: 'Refactor Backend',
    type: 'Task',
    status: 'In Progress',
    priority: 'Medium',
    performer: 'Alice Smith',
  },
  {
    id: 5,
    start: addDays(new Date(), 1),
    end: addDays(new Date(), 10),
    title: 'UI Redesign',
    type: 'Project',
    status: 'To Do',
    priority: 'Hard',
    performer: 'Bob Johnson',
  },
  {
    id: 6,
    start: subDays(new Date(), 15),
    end: subDays(new Date(), 2),
    title: 'Research',
    type: 'Sprint',
    status: 'Closed',
    priority: 'Low',
    performer: 'Eve Clarke',
  },
  {
    id: 7,
    start: subDays(new Date(), 1),
    end: addDays(new Date(), 4),
    title: 'Write Tests',
    type: 'Task',
    status: 'In Progress',
    priority: 'Medium',
    performer: 'John Doe',
  },
  {
    id: 8,
    start: null,
    end: null,
    title: 'Prepare Documentation',
    type: 'Task',
    status: 'To Do',
    priority: 'Low',
    performer: 'Alice Smith',
  },
  {
    id: 9,
    start: addDays(new Date(), 5),
    end: addDays(new Date(), 15),
    title: 'Marketing Campaign',
    type: 'Project',
    status: 'To Do',
    priority: 'Hard',
    performer: 'Sarah Taylor',
  },
  {
    id: 10,
    start: subDays(new Date(), 20),
    end: subDays(new Date(), 5),
    title: 'Fix Critical Bugs',
    type: 'Sprint',
    status: 'Closed',
    priority: 'Hard',
    performer: 'Bob Johnson',
  },
];
