import { useChartStore } from "../../../../chart/useChartStore";
import { calculateDate } from "../../../helpers";
import { headerRelation } from "../const";
import { getCells } from "../helpers";
import { HeaderGroup, ITimelineProps } from "../types";
import { useMemo } from "react";

export const useTimeline = ({ intervalWidth, viewType }: ITimelineProps) => {
  const { useStore } = useChartStore();

  const maxX = useStore((s) => s.maxX);

  const minDate = calculateDate(-maxX, intervalWidth);
  const maxDate = calculateDate(maxX, intervalWidth);

  const headers = useMemo<HeaderGroup[]>(() => {
    if (viewType === "year") return [];
    if (!minDate || !maxDate) return [];

    return getCells({
      minDate,
      maxDate,
      viewType: headerRelation[viewType],
      intervalWidth,
    });
  }, [intervalWidth, maxDate, minDate, viewType]);

  const cells = useMemo<HeaderGroup[]>(() => {
    if (!minDate || !maxDate) return [];

    return getCells({
      minDate,
      maxDate,
      viewType,
      intervalWidth,
    });
  }, [intervalWidth, maxDate, minDate, viewType]);

  const cellHeight = viewType === "year" ? "100%" : "50%";
  const cellTop = viewType === "year" ? 0 : "50%";

  return {
    headers,
    cells,
    cellHeight,
    cellTop,
  };
};
