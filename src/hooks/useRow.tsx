import { isNumber } from "lodash-es";
import { useCallback } from "react";
import { getRelativeMousePosition } from "../chart/helpers";
import { BarDefinition, Position } from "../chart/types";
import { useChartStore } from "../chart/useChartStore";
import { useEvent } from "./useEvent";
import { useMouse } from "@mantine/hooks";

export const useRow = ({
  data,
  order,
}: {
  data: BarDefinition;
  order: number;
}) => {
  const { useStore, useProps } = useChartStore();

  const totalData = useProps((s) => s.bars);
  const rowHeight = useProps((s) => s.rowHeight);

  const onBarsChange = useProps((s) => s.onBarsChange);

  const maxX = useStore((s) => s.maxX);
  const isIdle = useStore((s) => !s.connecting && !s.dragging && !s.resizing);

  const isAddable = (isIdle && !isNumber(data.x1)) || !isNumber(data.x2);

  const { ref, x } = useMouse();

  const onMouseMove = useEvent(() => {
    useStore.setState({ creation: { x, id: data.id, y: order * rowHeight } });
  });

  const onMouseLeave = useCallback(() => {
    useStore.setState({ creation: null });
  }, [useStore]);

  const onClick = useEvent<React.MouseEventHandler<HTMLElement>>((event) => {
    useStore.setState({ creation: null });

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

  return {
    ref,
    listeners: isAddable
      ? {
          onMouseLeave,
          onMouseMove,
          onClick,
        }
      : {},
  };
};
