import { Box, Flex, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { ConnectHandle } from "./ConnectHandle";
import { ResizeHandle } from "./ResizeHandle";

import { format } from "date-fns";
import { memo } from "react";
import { useChartStore } from "../../chart/useChartStore";
import { GanttBarDefinition } from "../Gantt";
import { useDragHandle } from "../../hooks/useDragHandle";

export const GanttBar = memo(({ data }: { data: GanttBarDefinition }) => {
  const { useStore } = useChartStore();

  // const onChange = useGStore((s) => s.onBarsChange);
  // const totalData = useGStore((s) => s.bars);

  const { isDragging, listeners } = useDragHandle({ id: data.id });

  const { hovered, ref } = useHover();

  const isResizing = useStore((s) => s.resizing?.id === data.id);
  const connection = useStore((s) => s.connecting);
  const isStartConnect = connection?.from === data.id;

  return (
    <div
      ref={ref}
      style={{
        borderRadius: 100,
        width: "100%",
        display: "flex",
        padding: 4,
        minWidth: hovered ? undefined : 0,
        alignItems: "center",
        position: "relative",
        background: "lightgray",
        flex: 1,
        boxShadow: isDragging
          ? "0 0 0 2px var(--mantine-color-blue-5)"
          : undefined,
        userSelect: "none",
      }}
    >
      <div
        {...listeners}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          gap: 8,
          flex: 1,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          minWidth: 0,
        }}
      >
        <Text truncate="end" miw={0}>
          {format(data.start || "", "dd MMM")}/
          {format(data.end || "", "dd MMM")}
        </Text>
        {/* {hovered && (
            <ActionIcon
              mr={6}
              style={{
                flexShrink: 0,
              }}
              size="xs"
              onClick={() =>
                onChange?.(
                  totalData.map((item) =>
                    item.id === data.id ? { ...data, x1: null, x2: null } : item
                  )
                )
              }
            >
              <IconX />
            </ActionIcon>
          )} */}
      </div>

      {!connection && (hovered || isResizing) && (
        <Box pos={"absolute"} left={0} top={0} bottom={0}>
          <ResizeHandle id={data.id} side={"start"} />
        </Box>
      )}
      {!connection && (hovered || isResizing) && (
        <Box pos={"absolute"} right={0} top={0} bottom={0}>
          <ResizeHandle id={data.id} side={"end"} />
        </Box>
      )}
      {(!!connection || hovered) && !isStartConnect && (
        <Flex pos={"absolute"} left={-24} top={0} bottom={0} align={"center"}>
          <ConnectHandle id={data.id} side={"start"} />
        </Flex>
      )}
      {(!!connection || hovered) && !isStartConnect && (
        <Flex pos={"absolute"} right={-24} top={0} bottom={0} align={"center"}>
          <ConnectHandle id={data.id} side={"end"} />
        </Flex>
      )}

      {/* <Box
        pos={"absolute"}
        top={2}
        left={2}
        fz={8}
        fw={600}
        bg={"black"}
        c={"white"}
      >
        {position.x1}/{position.y1}
      </Box>
      <Box
        pos={"absolute"}
        bottom={2}
        left={2}
        fz={8}
        fw={600}
        bg={"black"}
        c={"white"}
      >
        {position.x1}/{position.y2}
      </Box>
      <Box
        pos={"absolute"}
        top={2}
        right={2}
        fz={8}
        fw={600}
        bg={"black"}
        c={"white"}
      >
        {position.x2}/{position.y1}
      </Box>
      <Box
        pos={"absolute"}
        bottom={2}
        right={2}
        fz={8}
        fw={600}
        bg={"black"}
        c={"white"}
      >
        {position.x2}/{position.y2}
      </Box> */}
    </div>
  );
});
