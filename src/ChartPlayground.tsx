import { useState } from 'react';

import { Paper, Stack, Title } from '@mantine/core';

import { Chart } from './chart/Chart';
import { BarDefinition, DependenceDefinition } from './chart/types';

export const ChartPlayground = () => {
  const [rowHeight] = useState(50);

  const [bars, setBars] = useState<BarDefinition[]>([
    {
      id: 1,
      x1: null,
      x2: 270,
    },
    {
      id: 2,
      x1: 100,
      x2: 340,
      isGroup: true,
      color: 'red',
    },
    {
      id: 3,
      x1: 170,
      x2: 290,
    },
    {
      id: 4,
      x1: 123,
      x2: 500,
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
    {
      id: 7,
      x1: 170,
      x2: 290,
    },
  ]);

  const [dependencies, setDependencies] = useState<DependenceDefinition[]>([
    {
      from: 1,
      to: 2,
      fromSide: 'start',
      toSide: 'start',
    },
    // {
    //   from: 3,
    //   to: 4,
    //   fromSide: "end",
    //   toSide: "end",
    // },
    // {
    //   from: 4,
    //   to: 5,
    //   fromSide: "start",
    //   toSide: "end",
    // },
    // {
    //   from: 6,
    //   to: 7,
    //   fromSide: "end",
    //   toSide: "start",
    // },
  ]);

  return (
    <Paper shadow="md" p={'md'}>
      <Title>Chart Playground</Title>
      <Stack gap={12}>
        <Chart
          onDependenceClick={() => console.log('onDependenceClick')}
          rowHeight={rowHeight}
          bars={bars}
          onBarsChange={(type, bar) => {
            if (type === 'update') {
              setBars((prev) =>
                prev.map((item) => {
                  return item.id === bar.id ? bar : item;
                }),
              );
            }

            if (type === 'add') {
              setBars((prev) =>
                prev.map((item) => {
                  return item.id === bar.id ? bar : item;
                }),
              );
            }
          }}
          dependencies={dependencies}
          onDependenciesChange={(type, dep) => {
            if (type === 'add') {
              setDependencies((prev) => [...prev, dep]);
            }
          }}
        />
      </Stack>
    </Paper>
  );
};
