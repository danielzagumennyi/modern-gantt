import { useMemo, useRef, useState } from 'react';

import { Box, Flex, InputLabel, Select, Slider, Stack } from '@mantine/core';

import { AirTable } from '../../airTable/AirTable';
import { ThemeProvider } from '../../chart/components/ThemeProvider';
import { ChartApi } from '../../chart/store';
import { DependenceDefinition } from '../../chart/types';
import { Gantt, GanttViewType } from '../../gantt';
import { Sidebar } from '../../sidebar/Sidebar';
import { SidebarToggle } from '../../sidebar/SidebarToggle';
import { bars, getColumns } from './const';
import { Item } from './types';

export const DefaultGanttExample = () => {
  const [rowHeight, setRowHeight] = useState(50);

  const [viewBars, setViewBars] = useState<Item[]>(bars);
  const [dependencies, setDependencies] = useState<DependenceDefinition[]>([
    {
      from: 1,
      to: 3,
      fromSide: 'end',
      toSide: 'start',
    },
  ]);
  const [viewType, setViewType] = useState<GanttViewType>('day');

  // const handleChangeViewColumns = useCallback((column: Column) => {
  //   setViewColumns((prev) => {
  //     console.log({ finding: prev.find(satisfiedColumns(column)) });
  //     if (prev.find(satisfiedColumns(column))) {
  //       console.log('Finding');
  //     } else {
  //       console.log('Not finding');
  //     }
  //     return prev.find(satisfiedColumns(column))
  //       ? prev.filter((col: Column) => col.field !== column.field)
  //       : [...prev, column];
  //   });
  // }, []);

  const apiRef = useRef<ChartApi>(null);

  const columns = useMemo(() => {
    if (!apiRef.current) return [];
    return getColumns(apiRef.current);
  }, [apiRef.current]);

  const [opened, setOpened] = useState(false);

  return (
    <Stack gap={12}>
      <div style={{ position: 'relative' }}>
        <InputLabel>Row Height</InputLabel>
        <Slider
          min={100}
          max={300}
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
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'quarter', label: 'Quarter' },
            { value: 'year', label: 'Year' },
          ]}
          value={viewType}
          onChange={(value) => {
            if (value) {
              setViewType(value as GanttViewType);
            }
          }}
        />
      </div>

      <ThemeProvider rowHeight={rowHeight}>
        <Flex h={500}>
          <Box pos="relative" h="100%">
            {opened && (
              <Sidebar minWidth={100} maxWidth={400} defaultWidth={300}>
                <AirTable columns={columns} rows={viewBars} rowKey="id" />
              </Sidebar>
            )}
            <SidebarToggle
              opened={opened}
              onClick={() => setOpened((p) => !p)}
            />
          </Box>
          <Gantt<Item>
            apiRef={apiRef}
            bars={viewBars}
            onDependenceClick={(data) => {
              const fromData = bars.find((el) => el.id === data.from);
              const toData = bars.find((el) => el.id === data.to);

              if (!fromData || !toData) return;

              console.log('onDependenceClick', data, fromData, toData);
            }}
            rowHeight={rowHeight}
            onBarsChange={(type, bar) => {
              if (type === 'update') {
                setViewBars((prev) =>
                  prev.map((item) => {
                    return item.id === bar.id ? bar : item;
                  }),
                );
              }

              if (type === 'add') {
                setViewBars((prev) =>
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
            viewType={viewType}
            renderInvalidBar={() => {
              return (
                <div
                  style={{
                    width: 48,
                    flexShrink: 0,
                    borderRadius: 4,
                    height: 24,
                    background: 'red',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                  }}
                />
              );
            }}
          />
        </Flex>
      </ThemeProvider>
    </Stack>
  );
};
