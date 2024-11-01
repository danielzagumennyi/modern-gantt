import { LineDefinition } from "../types";

export const Line = ({ data }: { data: LineDefinition }) => {
  const width = 5;
  return (
    <div
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
};
