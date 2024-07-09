import { CSSProperties, PropsWithChildren } from "react";

export const ThemeProvider = (
  props: PropsWithChildren<{ rowHeight: number }>
) => {
  return (
    <div
      style={
        {
          minWidth: 0,

          "--row-height": props.rowHeight + "px",

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
      {props.children}
    </div>
  );
};
