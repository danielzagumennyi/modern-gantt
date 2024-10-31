import {
  Container,
  InputLabel,
  MantineProvider,
  Select,
  Slider,
  Stack,
} from "@mantine/core";
import { addDays, subDays } from "date-fns";
import { useState } from "react";
import { DependenceDefinition } from "./chart/types";
import { GanttBarDefinition, GanttViewType } from "./gantt";
import { Gantt } from "./gantt/Gantt";

import "@mantine/core/styles.css";
import { ChartPlayground } from "./ChartPlayground";

function App() {
  const [intervalWidth, setIntervalWidth] = useState(25);
  const [rowHeight, setRowHeight] = useState(50);

  const [bars, setBars] = useState<GanttBarDefinition[]>([
    {
      id: 1,
      start: null,
      end: addDays(new Date(), 15),
      // x1: 50,
      // x2: 270,
    },
    {
      id: 2,
      start: addDays(new Date(), 25),
      end: addDays(new Date(), 50),
      // x1: null,
      // x2: 340,
    },
    {
      id: 3,
      start: addDays(new Date(), 7),
      end: addDays(new Date(), 14),
      // x1: 170,
      // x2: 290,
    },
    {
      id: 4,
      start: addDays(new Date(), 3),
      end: addDays(new Date(), 2),
      // x1: 123,
      // x2: 1070,
    },
    {
      id: 5,
      start: subDays(new Date(), 10),
      end: addDays(new Date(), 15),
      // x1: 100,
      // x2: 240,
    },
    {
      id: 6,
      start: subDays(new Date(), 20),
      end: subDays(new Date(), 10),
      // x1: 170,
      // x2: 290,
    },
  ]);

  const [dependencies, setDependencies] = useState<DependenceDefinition[]>([
    {
      from: 1,
      to: 3,
      fromSide: "end",
      toSide: "start",
    },
  ]);

  const [viewType, setViewType] = useState<GanttViewType>("day");
  const [groupBy, setGroupBy] = useState<GanttViewType>("week");

  return (
    <MantineProvider defaultColorScheme="light">
      <Container>
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
            <InputLabel>Interval Width</InputLabel>
            <Slider
              min={10}
              max={100}
              step={1}
              value={intervalWidth}
              onChangeEnd={setIntervalWidth}
            />
          </div>
          <div>
            <InputLabel>View Type</InputLabel>
            <Select
              checkIconPosition="right"
              data={[
                { value: "hour", label: "Hour" },
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
            <InputLabel>Group By</InputLabel>
            <Select
              checkIconPosition="right"
              data={[
                { value: "hour", label: "Hour" },
                { value: "day", label: "Day" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "quarter", label: "Quarter" },
                { value: "year", label: "Year" },
              ]}
              value={groupBy}
              onChange={(value) => {
                if (value) {
                  setGroupBy(value as GanttViewType);
                }
              }}
            />
          </div>
          <Gantt
            // intervalWidth={intervalWidth}
            timelineGroupType={groupBy}
            rowHeight={rowHeight}
            bars={bars}
            onBarsChange={(type, bar) => {
              if (type === "update") {
                setBars((prev) =>
                  prev.map((item) => {
                    return item.id === bar.id ? bar : item;
                  })
                );
              }

              if (type === "add") {
                setBars((prev) =>
                  prev.map((item) => {
                    return item.id === bar.id ? bar : item;
                  })
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
        </Stack>
        <ChartPlayground />
      </Container>
    </MantineProvider>
  );
}

export default App;
