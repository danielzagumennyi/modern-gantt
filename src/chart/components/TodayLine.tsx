import { useToday } from "../../hooks/useToday";
import { Line } from "./Line";

export const TodayLine = () => {
  const { ref } = useToday();
  return <Line ref={ref} data={{ id: "today", x: 25 }} />;
};
