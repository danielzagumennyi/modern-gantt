import { memo, useMemo } from "react";
import { DependenceDefinition } from "../types";
import { useChartStore } from "../useChartStore";

import { getSmoothStepPath, Position } from "@xyflow/react";
import styles from "../../Chart.module.css";

export const LineDependence = memo(
  ({ data }: { data: DependenceDefinition }) => {
    const { useStore, useProps } = useChartStore();

    const rowHeight = useProps((s) => s.rowHeight);
    const handleClick = useProps((s) => s.onDependenceClick);

    const fromBar = useStore((s) => s.positions[data.from]);
    const toBar = useStore((s) => s.positions[data.to]);

    // const [isOpen, setIsOpen] = useState(false);

    // const { refs, floatingStyles, context } = useFloating({
    //   open: isOpen,
    //   onOpenChange: setIsOpen,
    //   placement: "top",
    //   middleware: [offset(10)],
    // });

    // const hover = useHover(context);
    // const clientPoint = useClientPoint(context);

    // const { getReferenceProps, getFloatingProps } = useInteractions([
    //   hover,
    //   clientPoint,
    // ]);

    const rect = useMemo(() => {
      if (!fromBar || !toBar) return null;

      const verticalOffset = rowHeight / 2;

      const y1 = fromBar.y1 + verticalOffset;
      const y2 = toBar.y1 + verticalOffset;

      const x1 = data.fromSide === "start" ? fromBar.x1 : fromBar.x2;
      const x2 = data.toSide === "start" ? toBar.x1 : toBar.x2;

      const [path] = getSmoothStepPath({
        sourceX: x1,
        sourceY: y1,
        sourcePosition:
          data.fromSide === "start" ? Position.Left : Position.Right,
        targetX: x2,
        targetY: y2,
        targetPosition:
          data.toSide === "start" ? Position.Left : Position.Right,
      });

      return (
        <>
          <g
            className={styles.dependence}
            onClick={() => handleClick?.(data)}
            // ref={refs.setReference}
            // {...getReferenceProps()}
          >
            <path d={path} />
            <path data-ghost d={path} />
          </g>
          {/* {isOpen && (
            <FloatingPortal>
              <div
                className={styles.dependenceTooltip}
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                Dependence data
              </div>
            </FloatingPortal>
          )} */}
        </>
      );
    }, [data, fromBar, handleClick, rowHeight, toBar]);

    return rect;
  }
);
