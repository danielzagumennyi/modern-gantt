import { CSSProperties, useEffect, useRef } from "react";
import { BarDefinition, Position } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { isNumber } from "lodash-es";

export const getPosWidth = (pos?: Position | null) => {
  return pos && isNumber(pos.x1) && isNumber(pos.x2) ? pos.x2 - pos.x1 : 0;
};

export const useBar = <T extends HTMLElement>({
  data,
}: {
  data: BarDefinition;
}) => {
  const { useStore, useProps } = useChartStore();

  const rowHeight = useProps((s) => s.rowHeight);

  const pos = useStore((s) => s.positions[data.id]);

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
  }, [data, useStore]);

  const left = pos ? pos.x1 ?? pos.x2 : 0;
  const width =
    pos && isNumber(pos.x1) && isNumber(pos.x2) ? pos.x2 - pos.x1 : 0;

  const style: CSSProperties = {
    transform: `translateX(${left}px)`,
    width: width,
    position: "absolute",
    height: rowHeight,
    top: pos?.y1,
    display: "flex",
    alignItems: "center",
    touchAction: "none",
    userSelect: "none",
  };

  return {
    width,
    position: pos,
    style,
    ref,
  };
};
