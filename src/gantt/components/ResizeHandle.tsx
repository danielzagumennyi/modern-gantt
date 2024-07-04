import { Flex } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";
import { useResizeHandle } from "../../hooks/useResizeHandle";
import { Side } from "../../chart/types";

export const ResizeHandle = ({
  id,
  side,
}: {
  id: string | number;
  side: Side;
}) => {
  const { listeners } = useResizeHandle({
    id,
    side,
  });

  return (
    <Flex
      align={"center"}
      {...listeners}
      bg={"gray.6"}
      c="white"
      h={"100%"}
      style={
        side === "start"
          ? {
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              paddingRight: 0,
              paddingLeft: 2,
              cursor: "col-resize",
            }
          : {
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
              paddingRight: 2,
              paddingLeft: 0,
              cursor: "col-resize",
            }
      }
    >
      <IconGripVertical size={16} />
    </Flex>
  );
};
