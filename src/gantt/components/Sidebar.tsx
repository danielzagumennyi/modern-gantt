import { Flex } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { clamp } from "lodash-es";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useDragController } from "../../hooks/useDragController";
import { GanttBarDefinition } from "../Gantt";
import { AirTable, IAirTableColumnDef } from "./airTable/AirTable";

export const Sidebar = ({
  data,
  rowHeight,
  maxWidth,
  minWidth,
}: {
  data: GanttBarDefinition[];
  rowHeight: number;
  maxWidth: number;
  minWidth: number;
}) => {
  const [opened, setOpened] = useState(true);

  const columns: IAirTableColumnDef<GanttBarDefinition>[] = [
    {
      field: "id",
      header: "Name",
    },
  ];

  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [initWidth, setInitWidth] = useState(-1);

  const { listeners } = useDragController({
    onStart: () => setInitWidth(sidebarWidth),
    onMove: ({ deltaX }) => {
      const width = clamp(initWidth + deltaX, minWidth, maxWidth);
      setSidebarWidth(width);
    },
    onEnd: () => setInitWidth(-1),
  });

  useEffect(() => {
    setSidebarWidth((prev) => clamp(prev, minWidth, maxWidth));
  }, [maxWidth, minWidth]);

  return (
    <Wrapper
      pos={"relative"}
      style={{
        width: opened ? sidebarWidth : 0,
      }}
      data-resizing={initWidth !== -1}
    >
      {opened && (
        <>
          <TableWrapper $rowHeight={rowHeight}>
            <AirTable columns={columns} data={data} rowKey="id" />
          </TableWrapper>
          <ResizeHandle {...listeners} />
        </>
      )}

      <Toggle onClick={() => setOpened((p) => !p)}>
        {opened ? <IconChevronLeft /> : <IconChevronRight />}
      </Toggle>
    </Wrapper>
  );
};

const TableWrapper = styled.div<{ $rowHeight: number }>`
  flex: 1;
  ${AirTable.Header} {
    height: 50px;
  }

  ${AirTable.Cell} {
    height: ${(p) => p.$rowHeight}px;
  }
`;

const ResizeHandle = styled.div`
  touch-action: none;
  user-select: none;
  width: 2px;
  background: var(--mantine-color-gray-1);
  cursor: col-resize;

  &:hover {
    background: var(--mantine-color-blue-5);
  }
`;

const Toggle = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border: 1px solid var(--mantine-color-gray-1);
  border-left: none;
  cursor: pointer;
  width: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--mantine-color-white);

  &:hover {
    color: var(--mantine-color-white);
    background: var(--mantine-color-blue-5);
    border-color: var(--mantine-color-blue-5);
  }
`;

const Wrapper: typeof Flex = styled(Flex)`
  z-index: 5;
  flex-shrink: 0;

  &[data-resizing="true"] {
    ${ResizeHandle} {
      background: var(--mantine-color-blue-5);
    }

    ${Toggle} {
      background: var(--mantine-color-blue-5);
      border-color: var(--mantine-color-blue-5);
      color: var(--mantine-color-white);
    }
  }
`;
