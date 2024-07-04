import { CSSProperties, useEffect, useRef } from "react";
import { BarDefinition } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";

export const useBar = <T extends HTMLElement>({
  data,
}: {
  data: BarDefinition;
}) => {
  const { useStore } = useChartStore();

  const ref = useRef<T>(null);

  useEffect(() => {
    useStore.setState((prev) => {
      if (!ref.current) return prev;

      return {
        ...prev,
        elements: {
          ...prev.elements,
          [data.id]: ref.current,
        },
      };
    });

    return () => {
      useStore.setState((prev) => ({
        ...prev,
        elements: {
          ...prev.elements,
          [data.id]: undefined,
        },
      }));
    };
  }, [data.id, useStore]);

  const pos = useStore((s) => s.positions[data.id]);
  const rowHeight = useStore((s) => s.rowHeight);

  const left = pos ? pos.x1 : 0;
  const width = pos ? pos.x2 - pos.x1 : 0;

  const style: CSSProperties = {
    transform: `translateX(${left}px)`,
    width: width,
    position: "absolute",
    height: rowHeight,
    top: pos?.y1,
    display: "flex",
    alignItems: "center",
    touchAction: "none",
  };

  return {
    position: pos,
    style,
    ref,
  };
};
