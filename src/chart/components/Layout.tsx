import { CSSProperties, useEffect, useRef } from "react";
import { AirTable } from "../../airTable/AirTable";
import { Sidebar } from "../../sidebar/Sidebar";
import { SidebarToggle } from "../../sidebar/SidebarToggle";
import { Graph } from "../Graph";
import { preventDefault } from "../helpers";
import { useChartStore } from "../useChartStore";
import { AutoScrollHandle } from "./AutoScrollHandle";

import styles from "./Layout.module.css";

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
  const sidebarOpened = useStore((s) => s.sidebarOpened);

  const isIdle = useStore((s) => !s.connecting && !s.dragging && !s.resizing);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerHeight = scrollContainerRef.current
    ? scrollContainerRef.current.clientHeight - (rowHeight + 16)
    : null;

  useEffect(() => {
    const el = scrollContainerRef.current;

    el?.addEventListener("drag", preventDefault);
    el?.addEventListener("drop", preventDefault);

    return () => {
      el?.removeEventListener("drag", preventDefault);
      el?.removeEventListener("drop", preventDefault);
    };
  }, [isIdle]);

  useEffect(() => {
    useStore.setState({
      containerElement: scrollContainerRef.current,
    });

    return () => {
      useStore.setState({
        containerElement: null,
      });
    };
  }, [useStore]);

  return (
    <div
      className={styles.root}
      style={
        {
          "--height": containerHeight + "px",
          "--scroll-container-height": scrollContainerHeight + "px",
          "--content-width": containerWidth + "px",
          "--sidebar-width": (sidebarOpened ? sidebarWidth : 0) + "px",
          "--row-height": rowHeight + "px",

          "--sidebar-active-resize-color": "#339af0",

          "--header-height": "50px",
          "--bar-height": "24px",

          "--border-radius": "6px",

          "--border-color-light": "#dee2e6",
          "--border-color-dark": "#424242",

          "--header-bg-light": "#fff",
          "--header-bg-dark": "#242424",
          "--header-bg-dark-weekend": "#2E2E2E",
          "--header-bg-light-weekend": "#f1f3f5",

          "--row-odd-bg-light": "#f8f9fa",
          "--row-odd-bg-dark": "#242424",
          "--row-even-bg-light": "#f1f3f5",
          "--row-even-bg-dark": "#1f1f1f",

          "--bar-bg": "#339af0",
          "--creation-bg": "#a5d8ff",
          "--group-bg": "#ff922b",

          "--text-size": "12px",

          "--dep-color": "#adb5bd",
          "--dep-hover-color": "black",
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
        {!!columns?.length && sidebarOpened && (
          <div className={styles.sidebar}>
            <Sidebar
              minWidth={minSidebarWidth || 200}
              maxWidth={maxSidebarWidth || 600}
            >
              <AirTable columns={columns} rows={bars} rowKey="id" />
            </Sidebar>
          </div>
        )}

        {!isIdle && (
          <>
            <AutoScrollHandle side="start" />
            <AutoScrollHandle side="end" />
          </>
        )}

        <div className={styles.layout} ref={scrollContainerRef}>
          <div className={styles.header}>{renderAbove?.()}</div>

          <div className={styles.content}>
            

            <Graph />
          </div>
        </div>
        {!!columns?.length && <SidebarToggle />}
      </div>
    </div>
  );
};
