import { Box, Flex } from "@mantine/core";
import { Side } from "../../chart/types";
import { useConnectHandle } from "../../hooks/useConnectHandle";
import { useConnectable } from "../../hooks/useConnectable";

export const ConnectHandle = ({
  id,
  side,
}: {
  id: string | number;
  side: Side;
}) => {
  const { listeners } = useConnectHandle({ id, side });
  const { ref, isOver } = useConnectable<HTMLDivElement>({ id, side });

  return (
    <Flex
      ref={ref}
      justify={"center"}
      align={"center"}
      h={24}
      w={24}
      style={{ cursor: "pointer" }}
      {...listeners}
    >
      <Box
        w={12}
        h={12}
        bg={isOver ? "green" : "blue"}
        style={{ borderRadius: 12 }}
      />
    </Flex>
  );
};
