import {
  Box,
  Button,
  Checkbox,
  InputLabel,
  Popover,
  Select,
  Slider,
  Stack,
} from "@mantine/core";
import { useCallback, useState } from "react";
import { Gantt, GanttViewType } from "../../gantt";
import { DependenceDefinition } from "../../chart/types";
import { Column, Item } from "./types";
import { bars, columns } from "./const";

export const DefaultGanttExample = () => {
  const [rowHeight, setRowHeight] = useState(50);
  const [viewColumns, setViewColumns] = useState<Column[]>(columns);
  const [viewBars, setViewBars] = useState<Item[]>(bars);
  const [dependencies, setDependencies] = useState<DependenceDefinition[]>([
    {
      from: 1,
      to: 3,
      fromSide: "end",
      toSide: "start",
    },
  ]);
  const [viewType, setViewType] = useState<GanttViewType>("day");

  const handleChangeViewColumns = useCallback((column: Column) => {
    setViewColumns((prev) => {
      console.log({ finding: prev.find(satisfiedColumns(column)) });
      if (prev.find(satisfiedColumns(column))) {
        console.log("Finding");
      } else {
        console.log("Not finding");
      }
      return prev.find(satisfiedColumns(column))
        ? prev.filter((col: Column) => col.field !== column.field)
        : [...prev, column];
    });
  }, []);

  return (
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
  );
};

function satisfiedColumns(column: Column) {
  return (col: Column) => col.field === column.field;
}
