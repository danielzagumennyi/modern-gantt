import { memo } from "react";
import { BarDefinition } from "../types";
import { ResizeHandle } from "./ResizeHandle";
import { useDragHandle } from "../../hooks/useDragHandle";

export const ChartBar = memo(({ data }: { data: BarDefinition }) => {
  const { listeners } = useDragHandle({
    id: data.id,
  });

  return (
    <div
      {...listeners}
      style={{
        background: "gray",
        width: "100%",
        height: "50%",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", right: "100%", top: 0, bottom: 0 }}>
        <ResizeHandle id={data.id} side="start" />
      </div>
      <div style={{ position: "absolute", left: "100%", top: 0, bottom: 0 }}>
        <ResizeHandle id={data.id} side="end" />
      </div>
    </div>
  );
});
