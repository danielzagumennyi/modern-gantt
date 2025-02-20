import { memo } from "react";

import styles from "./Timeline.module.css";
import { TimelineHeader } from "./TimelineHeader.tsx";
import { ITimelineProps } from "./types.ts";
import { useTimeline } from "./hooks/useTimeline.ts";
import { TimelineCell } from "./TimelineCell.tsx";

export const Timeline = memo((props: ITimelineProps) => {
  const { headers, cells, cellTop, cellHeight } = useTimeline(props);
  const { intervalWidth } = props;

  return (
    <div className={styles.root}>
      {headers.map((item) => (
        <TimelineHeader
          key={item.date.getTime()}
          item={item}
          style={{
            left: item.left,
            width: intervalWidth * item.days,
          }}
        />
      ))}
      {cells.map((item) => (
        <TimelineCell
          key={item.date.getTime()}
          item={item}
          style={{
            top: cellTop,
            height: cellHeight,
            left: item.left,
            width: intervalWidth * item.days,
          }}
        />
      ))}
    </div>
  );
});
