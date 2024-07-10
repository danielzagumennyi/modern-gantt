import { CSSProperties } from "react";
import { useChartStore } from "../useChartStore";
import styles from "./Layout.module.css";
import { Sidebar } from "../../sidebar/Sidebar";
import { AirTable } from "../../airTable/AirTable";
import { Graph } from "../Graph";
import { SidebarToggle } from "../../sidebar/SidebarToggle";

export const Layout = () => {
  const { useStore, useProps } = useChartStore();

  const bars = useProps((s) => s.bars);
  const columns = useProps((s) => s.columns);
  const rowHeight = useProps((s) => s.rowHeight);
  const minSidebarWidth = useProps((s) => s.minSidebarWidth);
  const maxSidebarWidth = useProps((s) => s.maxSidebarWidth);
  const renderAbove = useProps((s) => s.renderAbove);

  const containerWidth = useStore((s) => s.containerWidth);
  const containerHeight = useStore((s) => s.containerHeight);
  const sidebarWidth = useStore((s) => s.sidebarWidth);

  return (
    <div
      className={styles.root}
      style={
        {
          "--height": containerHeight + "px",
          "--content-width": containerWidth + "px",
          "--sidebar-width": sidebarWidth + "px",
          "--row-height": rowHeight + "px",

          "--sidebar-active-resize-color": "#339af0",

          "--header-height": "50px",
          "--bar-height": "24px",

          "--border-radius": "6px",

          "--border-color": "#dee2e6",

          "--header-bg": "#fff",
          "--row-odd-bg": "#f1f3f5",
          "--row-even-bg": "#f8f9fa",

          "--bar-bg": "#339af0",
          "--creation-bg": "#a5d8ff",
          "--group-bg": "#ff922b",

          "--text-size": "12px",

          "--dep-color": "rgba(0,0,0,0.25)",
          "--invalid-dep-color": "#fa5252",
          "--dep-width": "2px",

          "--resize-handle-bg": "#1c7ed6",
          "--resize-handle-inner-bg": "#fff",

          "--label-bg": "#ced4da",
          "--label-color": "#343a40",

          "--connect-color": "#228be6",
          "--connect-inner-color": "#fff",
          "--valid-connect-color": "#40c057",

          "--selection-bg": "rgba(51, 154, 240, 0.1)",
        } as CSSProperties
      }
    >
      <div className={styles.relative}>
        <div className={styles.layout}>
          <div className={styles.header}>
            <div className={styles.sidebarHeader}></div>
            {renderAbove?.()}
          </div>
          {!!columns?.length && (
            <div className={styles.sidebar}>
              <Sidebar
                minWidth={minSidebarWidth || 200}
                maxWidth={maxSidebarWidth || 600}
              >
                <AirTable columns={columns} data={bars} rowKey="id" />
              </Sidebar>
            </div>
          )}
          <div className={styles.content}>
            <Graph />
          </div>
        </div>
        <SidebarToggle />
      </div>
    </div>
  );
};
