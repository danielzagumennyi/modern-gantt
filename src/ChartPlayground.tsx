import { InputLabel, Paper, Slider, Stack, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { useState } from "react";
import { Chart } from "./chart/Chart";
import { BarDefinition, DependenceDefinition } from "./chart/types";

export const ChartPlayground = () => {
  const [rowHeight, setRowHeight] = useState(50);

  const [bars, setBars] = useState<BarDefinition[]>([
    {
      id: 1,
      x1: 50,
      x2: 270,
    },
    {
      id: 2,
      x1: null,
      x2: 340,
    },
    {
      id: 3,
      x1: 170,
      x2: 290,
    },
    {
      id: 4,
      x1: 123,
      x2: 1070,
    },
    {
      id: 5,
      x1: 100,
      x2: 240,
    },
    {
      id: 6,
      x1: 170,
      x2: 290,
    },
  ]);

  const [dependencies, setDependencies] = useState<DependenceDefinition[]>([
    {
      from: 1,
      to: 3,
      fromSide: "start",
      toSide: "end",
    },

    // {
    //   from: 5,
    //   to: 6,
    //   fromSide: "start",
    //   toSide: "start",
    // },
  ]);

  return (
    <Paper shadow="md" p={"md"}>
      <Title>Chart Playground</Title>
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
        <Chart
          rowHeight={rowHeight}
          bars={bars}
          onBarsChange={setBars}
          dependencies={dependencies}
          onDependenciesChange={setDependencies}
        />
      </Stack>
    </Paper>
  );
};
