import {
  Box,
  Button,
  Checkbox,
  Container,
  InputLabel,
  MantineProvider,
  Popover,
  Select,
  Slider,
  Stack,
  Switch,
} from "@mantine/core";
import { addDays, subDays } from "date-fns";
import { useCallback, useState } from "react";
import { DependenceDefinition } from "./chart/types";
import { GanttBarDefinition, GanttViewType } from "./gantt";
import { Gantt } from "./gantt/Gantt";

import "@mantine/core/styles.css";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { IAirTableColumnDef } from "./airTable/AirTable.tsx";

interface Item extends GanttBarDefinition {
  title: string;
  type: "Project" | "Sprint" | "Task";
  status: "To Do" | "Closed" | "In Progress";
  priority: "Low" | "Medium" | "Hard";
  performer: string;
}

const columns: IAirTableColumnDef<Item>[] = [
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

const bars: (Item & GanttBarDefinition)[] = [
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

function App() {
  const [rowHeight, setRowHeight] = useState(50);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [viewColumns, setViewColumns] =
    useState<IAirTableColumnDef<Item>[]>(columns);

  const [viewBars, setViewBars] = useState<(Item & GanttBarDefinition)[]>(bars);

  const [dependencies, setDependencies] = useState<DependenceDefinition[]>([
    {
      from: 1,
      to: 3,
      fromSide: "end",
      toSide: "start",
    },
  ]);

  const [viewType, setViewType] = useState<GanttViewType>("day");

  const handleChangeViewColumns = useCallback(
    (column: IAirTableColumnDef<Item>) => {
      setViewColumns((prev) => {
        console.log({ finding: prev.find(satisfiedColumns(column)) });
        if (prev.find(satisfiedColumns(column))) {
          console.log("Finding");
        } else {
          console.log("Not finding");
        }
        return prev.find(satisfiedColumns(column))
          ? prev.filter(
              (col: IAirTableColumnDef<Item>) => col.field !== column.field,
            )
          : [...prev, column];
      });
    },
    [],
  );

  return (
    <MantineProvider defaultColorScheme={theme} forceColorScheme={theme}>
      <Container>
        <Switch
          checked={theme === "dark"}
          onChange={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          size="md"
          color="dark.4"
          onLabel={
            <IconSun
              size={16}
              stroke={2.5}
              color="var(--mantine-color-yellow-4)"
            />
          }
          offLabel={
            <IconMoonStars
              size={16}
              stroke={2.5}
              color="var(--mantine-color-blue-6)"
            />
          }
        />
        <Stack gap={12}>
          <div>
            <InputLabel>Row Height</InputLabel>
            <Slider
              min={10}
              max={100}
              step={1}
              value={rowHeight}
              onChangeEnd={setRowHeight}
            />
          </div>
          <div>
            <InputLabel>View Type</InputLabel>
            <Select
              checkIconPosition="right"
              data={[
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "quarter", label: "Quarter" },
                { value: "year", label: "Year" },
              ]}
              value={viewType}
              onChange={(value) => {
                if (value) {
                  setViewType(value as GanttViewType);
                }
              }}
            />
          </div>
          <div>
            <Popover>
              <Popover.Target>
                <Button>View</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Stack>
                  {columns.map((column) => (
                    <Checkbox
                      disabled={column.field === "name"}
                      key={column.field}
                      checked={!!viewColumns.find(satisfiedColumns(column))}
                      label={column.header}
                      onChange={() => handleChangeViewColumns(column)}
                    />
                  ))}
                </Stack>
              </Popover.Dropdown>
            </Popover>
          </div>

          <Box h={500}>
            <Gantt<Item>
              columns={viewColumns}
              bars={viewBars}
              onDependenceClick={(data) => {
                const fromData = bars.find((el) => el.id === data.from);
                const toData = bars.find((el) => el.id === data.to);

                if (!fromData || !toData) return;

                console.log("onDependenceClick", data, fromData, toData);
              }}
              rowHeight={rowHeight}
              onBarsChange={(type, bar) => {
                if (type === "update") {
                  setViewBars((prev) =>
                    prev.map((item) => {
                      return item.id === bar.id ? bar : item;
                    }),
                  );
                }

                if (type === "add") {
                  setViewBars((prev) =>
                    prev.map((item) => {
                      return item.id === bar.id ? bar : item;
                    }),
                  );
                }
              }}
              dependencies={dependencies}
              onDependenciesChange={(type, dep) => {
                if (type === "add") {
                  setDependencies((prev) => [...prev, dep]);
                }
              }}
              viewType={viewType}
            />
          </Box>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App;

function satisfiedColumns(column: IAirTableColumnDef<Item>) {
  return (col: IAirTableColumnDef<Item>) => col.field === column.field;
}
