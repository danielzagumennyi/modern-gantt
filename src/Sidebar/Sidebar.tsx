import { clamp } from "lodash-es";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDragController } from "../hooks/useDragController";

import styles from "./Sidebar.module.css";

export const Sidebar = ({
  maxWidth,
  minWidth,
  children,
}: PropsWithChildren<{
  maxWidth: number;
  minWidth: number;
}>) => {
  const [opened, setOpened] = useState(true);

  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [initWidth, setInitWidth] = useState(-1);

  const { listeners } = useDragController({
    onStart: () => setInitWidth(sidebarWidth),
    onMove: ({ deltaX }) => {
      const width = clamp(initWidth + deltaX, minWidth, maxWidth);
      setSidebarWidth(width);
    },
    onEnd: () => setInitWidth(-1),
  });

  useEffect(() => {
    setSidebarWidth((prev) => clamp(prev, minWidth, maxWidth));
  }, [maxWidth, minWidth]);

  return (
    <div
      className={styles.root}
      data-resizing={initWidth !== -1}
      style={{
        width: opened ? sidebarWidth : 0,
      }}
    >
      {opened && (
        <>
          <div className={styles.wrapper}>{children}</div>
          <div className={styles.resizeHandle} {...listeners} />
        </>
      )}

      <div className={styles.toggle} onClick={() => setOpened((p) => !p)}>
        {opened ? "<" : ">"}
      </div>
    </div>
  );
};
