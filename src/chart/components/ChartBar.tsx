import { memo } from "react";
import { BarDefinition } from "../types";
import { ResizeHandle } from "./ResizeHandle";
import { useDragHandle } from "../../hooks/useDragHandle";

import styles from "../../Chart.module.css";
import { ConnectHandle } from "./ConnectHandle";
import { useBarState } from "../../hooks/useBarState";

export const ChartBar = memo(({ data }: { data: BarDefinition }) => {
  const listeners = useDragHandle({
    id: data.id,
  });

  const state = useBarState(data.id);

  return (
    <div {...listeners} className={styles.bar} data-state={state}>
      <ResizeHandle id={data.id} side="start" />
      <ResizeHandle id={data.id} side="end" />
      <ConnectHandle id={data.id} side="start" />
      <ConnectHandle id={data.id} side="end" />
    </div>
  );
});
