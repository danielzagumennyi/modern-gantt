import { Tooltip, ThemeIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export const CreateBar = () => {
  return (
    <Tooltip label={"Click to create"} opened withArrow arrowSize={8}>
      <ThemeIcon
        color={"gray"}
        radius={"xl"}
        style={{
          transform: "translateX(-50%)",
        }}
      >
        <IconPlus />
      </ThemeIcon>
    </Tooltip>
  );
};
