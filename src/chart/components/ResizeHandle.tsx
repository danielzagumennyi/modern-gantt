import { IconGripVertical } from "@tabler/icons-react";
import { Side } from "../types";
import { useConnectable } from "../../hooks/useConnectable";
import { useResizeHandle } from "../../hooks/useResizeHandle";

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

  const { ref, isOver } = useConnectable<HTMLDivElement>({ id, side });

  return (
    <div
      {...listeners}
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        background: isOver ? "green" : "darkgray",
        color: "white",
        padding: 2,
        cursor: "col-resize",
      }}
    >
      <IconGripVertical size={16} />
    </div>
  );
};
