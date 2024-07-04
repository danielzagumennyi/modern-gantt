import { useHover, useMergedRef } from "@mantine/hooks";
import { memo } from "react";
import { useRow } from "../../hooks/useRow";
import { BarDefinition } from "../types";
import { useChartStore } from "../useChartStore";
import { CreateBar } from "./CreateBar";

export const Row = memo(
  ({ data, order }: { data: BarDefinition; order: number }) => {
    const { useStore } = useChartStore();

    const rowHeight = useStore((s) => s.rowHeight);
    const { listeners, isPreDraw, ref: rowRef, style } = useRow({ data });

    return (
      <div
        {...listeners}
        ref={rowRef}
        style={{
          position: "absolute",
          top: order * rowHeight,
          left: 0,
          right: 0,
          height: rowHeight,
          cursor: isPreDraw ? "pointer" : undefined,
        }}
      >
        {isPreDraw ? (
          <div style={style}>
            <CreateBar />
          </div>
        ) : null}
      </div>
    );
  }
);
