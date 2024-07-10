import { isNumber } from "lodash-es";
import { CSSProperties, useCallback, useState } from "react";
import { BarDefinition, Position } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { useEvent } from "./useEvent";
import { getRelativeMousePosition } from "../chart/helpers";
import { useMouse } from "./useMouse";

export const useRow = ({ data }: { data: BarDefinition }) => {
  const { useStore, useProps } = useChartStore();

  const totalData = useProps((s) => s.bars);
  const rowHeight = useProps((s) => s.rowHeight);

  const onBarsChange = useProps((s) => s.onBarsChange);

  const maxX = useStore((s) => s.maxX);
  const isIdle = useStore((s) => !s.connecting && !s.dragging && !s.resizing);

  const [isPreDraw, setIsPreDraw] = useState(false);

  const isAddable = (isIdle && !isNumber(data.x1)) || !isNumber(data.x2);

  const { ref, x } = useMouse();

  const onMouseEnter = useCallback(() => {
    setIsPreDraw(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsPreDraw(false);
  }, []);

  const onClick = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
    setIsPreDraw(false);

    const { x } = getRelativeMousePosition(
      event.currentTarget,
      event.nativeEvent
    );

    const itemIndex = totalData.findIndex((i) => i.id === data.id);

    const y1 = itemIndex * rowHeight;
    const y2 = itemIndex * (rowHeight + 1);

    const position: Position = {
      x1: x - maxX - 25,
      x2: x - maxX + 25,
      y1,
      y2,
    };

    onBarsChange?.("add", { ...data, ...position });
  });

  const style: CSSProperties = {
    transform: `translateX(${x}px)`,
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: 0,
  };

  return {
    ref,
    isPreDraw,
    style,
    listeners: isAddable
      ? {
          onMouseEnter,
          onMouseLeave,
          onClick,
        }
      : {},
  };
};
