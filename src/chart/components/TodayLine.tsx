import { useToday } from "../../hooks/useToday";
import { useChartStore } from "../useChartStore";
import { Line } from "./Line";

export const TodayLine = () => {
  const { ref } = useToday();
  const { useProps } = useChartStore()
  const { minWidth } = useProps()
  return <Line ref={ref} data={{ id: "today", x: 0 + ((minWidth || 0) / 2) }} />;
};
