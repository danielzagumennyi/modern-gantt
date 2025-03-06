import { useChartStore } from "../chart/useChartStore";
import { useEffect, useRef } from "react";

export const useToday = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { useStore } = useChartStore();

  useEffect(() => {
    useStore.setState((prev) =>
      !ref?.current
        ? prev
        : {
            ...prev,
            todayElement: ref.current,
          },
    );
  }, [useStore]);

  return { ref };
};
