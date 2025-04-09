import { clamp } from "lodash-es";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDragController } from "../hooks/useDragController";

import { useChartStore } from "../chart/useChartStore";

import styles from "./Sidebar.module.css";

interface IProps {
  maxWidth: number;
  minWidth: number;
}
export const Sidebar = ({
  maxWidth,
  minWidth,
  children,
}: PropsWithChildren<IProps>) => {
  const { useSidebar } = useChartStore();

  const [initWidth, setInitWidth] = useState(-1);

  const { listeners } = useDragController({
    onStart: () => setInitWidth(useSidebar.getState().sidebarWidth),
    onMove: ({ deltaX }) => {
      const width = clamp(initWidth + deltaX, minWidth, maxWidth);
      useSidebar.setState({
        sidebarWidth: width,
      });
    },
    onEnd: () => setInitWidth(-1),
  });

  useEffect(() => {
    useSidebar.setState((prev) => ({
      ...prev,
      sidebarWidth: clamp(prev.sidebarWidth, minWidth, maxWidth),
    }));
  }, [maxWidth, minWidth, useSidebar]);

  return (
    <div className={styles.root} data-resizing={initWidth !== -1}>
      <div className={styles.content}>{children}</div>
      <div className={styles.resizeHandle} {...listeners} />
    </div>
  );
};
