import { memo, useMemo } from "react";
import { useChartStore } from "../useChartStore";

export const HorizontalAxis = memo(() => {
  const { useStore } = useChartStore();

  const maxX = useStore((s) => s.maxX);

  const intervals = useMemo(() => {
    return Array.from({ length: (maxX * 2) / 100 + 1 }, (_, i) => i);
  }, [maxX]);

  return (
    <div
      style={{
        display: "flex",
        width: maxX * 2,
        background: "lightgray",
        overflow: "hidden",
      }}
    >
      {intervals.map((interval) => {
        return (
          <div
            key={interval}
            style={{
              width: 100,
              height: 25,
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 12,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                transform: "translateX(-50%)",
              }}
            >
              {interval * 100}
            </div>
          </div>
        );
      })}
    </div>
  );
});
