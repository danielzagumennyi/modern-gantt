import { useToday } from "../../hooks/useToday";
import { Line } from "./Line";

export const TodayLine = () => {
  const { ref, data } = useToday();
  return <Line key={"today"} ref={ref} data={data} />;
};
