import { clamp } from "lodash-es";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDragController } from "../hooks/useDragController";

import { useChartStore } from "../chart/useChartStore";

import styles from "./Sidebar.module.css";

export const Sidebar = ({
  maxWidth,
  minWidth,
  children,
}: PropsWithChildren<{
  maxWidth: number;
  minWidth: number;
}>) => {
  const { useStore } = useChartStore();

  const [initWidth, setInitWidth] = useState(-1);

  const { listeners } = useDragController({
    onStart: () => setInitWidth(useStore.getState().sidebarWidth),
    onMove: ({ deltaX }) => {
      const width = clamp(initWidth + deltaX, minWidth, maxWidth);
      useStore.setState({
        sidebarWidth: width,
      });
    },
    onEnd: () => setInitWidth(-1),
  });

  useEffect(() => {
    useStore.setState((prev) => ({
      ...prev,
      sidebarWidth: clamp(prev.sidebarWidth, minWidth, maxWidth),
    }));
  }, [maxWidth, minWidth, useStore]);

  return (
    <div className={styles.root} data-resizing={initWidth !== -1}>
      <div className={styles.content}>{children}</div>
      <div className={styles.resizeHandle} {...listeners} />
    </div>
  );
};
