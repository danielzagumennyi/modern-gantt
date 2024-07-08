import { isNumber } from "lodash-es";
import { CSSProperties, useCallback, useState } from "react";
import { BarDefinition, Position } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { useEvent } from "./useEvent";
import { getRelativeMousePosition } from "../chart/helpers";
import { useMouse } from "./useMouse";

export const useRow = ({ data }: { data: BarDefinition }) => {
  const { useStore } = useChartStore();
  const onChange = useStore((s) => s.onBarsChange);
  const totalData = useStore((s) => s.bars);
  const maxX = useStore((s) => s.maxX);
  const rowHeight = useStore((s) => s.rowHeight);
  const [isPreDraw, setIsPreDraw] = useState(false);

  const isAddable = !isNumber(data.x1) || !isNumber(data.x2);

  const { ref, x } = useMouse();

  const onMouseEnter = useCallback(() => {
    if (isAddable) setIsPreDraw(true);
  }, [isAddable]);

  const onMouseLeave = useCallback(() => {
    setIsPreDraw(false);
  }, []);

  const onClick = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
    setIsPreDraw(false);

    const { x } = getRelativeMousePosition(
      event.currentTarget,
      event.nativeEvent
    );

    const updatedData = totalData.map((item) => {
      const y1 = totalData.findIndex((i) => i.id === data.id) * rowHeight;
      const y2 = totalData.findIndex((i) => i.id === data.id) * (rowHeight + 1);

      const position: Position = {
        x1: x - maxX - 25,
        x2: x - maxX + 25,
        y1,
        y2,
      };

      const newItem: BarDefinition =
        item.id === data.id ? { ...data, ...position } : item;

      return newItem;
    });

    onChange?.(updatedData);
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
