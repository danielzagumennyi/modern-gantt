import { memo } from "react";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useChartStore } from "../chart/useChartStore";

import styles from "./SidebarToggle.module.css";

export const SidebarToggle = memo(() => {
  const { useStore } = useChartStore();

  const opened = useStore((s) => s.sidebarOpened);

  return (
    <div
      className={styles.toggle}
      onClick={() =>
        useStore.setState((prev) => ({
          ...prev,
          sidebarOpened: !prev.sidebarOpened,
        }))
      }
    >
      {opened ? <IconChevronLeft /> : <IconChevronRight />}
    </div>
  );
});
