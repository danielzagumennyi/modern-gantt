import { memo } from "react";
import { useBar } from "../../hooks/useBar";
import { BarDefinition } from "../types";
import { useChartStore } from "../useChartStore";

export const Bar = memo(({ data }: { data: BarDefinition }) => {
  const { useProps } = useChartStore();

  const renderBar = useProps((s) => s.renderBar);

  const { style, position, ref, width } = useBar<HTMLDivElement>({
    data,
  });

  if (!position) return null;

  return (
    <div style={style} ref={ref}>
      {renderBar?.({ data, position, width })}
    </div>
  );
});
