import { memo } from "react";
import { isNumber } from "lodash-es";
import { useChartStore } from "../useChartStore";

export const Connection = memo(() => {
  const { useStore } = useChartStore();

  const con = useStore((s) => s.connecting);
  const positions = useStore((s) => s.positions);
  const rowHeight = useStore((s) => s.rowHeight);

  if (!con) return null;

  const toPos = con.to ? positions[con.to] : null;

  const fromPos = positions[con.from];

  if (!fromPos) return null;

  const x1 = con.fromSide === "start" ? fromPos.x1 : fromPos.x2;
  const y1 = fromPos.y1 + rowHeight / 2;
  const to_y1 = con.toSide === "start" ? toPos?.y1 : toPos?.y1;

  const x2 = con.toSide === "start" ? toPos?.x1 : toPos?.x2 || con.x;
  const y2 = isNumber(to_y1) ? to_y1 + rowHeight / 2 : con.y;

  // const left = Math.min(x1, x2);
  // const top = Math.min(y1, y2);
  // const width = Math.abs(x2 - x1);
  // const height = Math.abs(y2 - y1);

  return (
    <g
    // style={{
    //   position: "absolute",
    //   zIndex: 1000,
    //   top,
    //   left,
    //   width,
    //   height,
    //   backgroundColor: "rgba(0,0,0,0.1)",
    // }}
    >
      <circle cx={x1} cy={y1} r={5} />
      <circle cx={x2} cy={y2} r={5} />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeDasharray="5,5"
      />
    </g>
  );
});
