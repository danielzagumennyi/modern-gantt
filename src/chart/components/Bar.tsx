import { memo } from "react";
import { useBar } from "../../hooks/useBar";
import { BarDefinition } from "../types";
import { useChartStore } from "../useChartStore";

export const Bar = memo(({ data }: { data: BarDefinition }) => {
  const { useStore } = useChartStore();

  const renderBar = useStore((s) => s.renderBar);
  const { style, position, ref } = useBar<HTMLDivElement>({ data });

  if (!position) return null;

  return (
    <div style={style} ref={ref}>
      {renderBar(data)}
    </div>
  );
});
