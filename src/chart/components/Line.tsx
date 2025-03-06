import { LineDefinition } from "../types";
import { forwardRef } from "react";

interface IProps {
  data: LineDefinition;
}
export const Line = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  const width = 5;
  return (
    <div
      ref={ref}
      style={{
        pointerEvents: "none",
        width,
        position: "absolute",
        top: 0,
        bottom: 0,
        transform: `translateX(${data.x - width / 2}px)`,
        backgroundColor: "var(--mantine-color-blue-2)",
      }}
    />
  );
});
