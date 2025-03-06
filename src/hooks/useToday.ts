import { useChartStore } from "../chart/useChartStore";
import { useEffect, useRef } from "react";

export const useToday = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { useStore, useProps } = useChartStore();
  const { minWidth } = useProps();

  useEffect(() => {
    useStore.setState({ todayElement: ref.current });

    return () => {
      useStore.setState({
        todayElement: null,
      });
    };
  }, [useStore]);

  return { ref, data: { id: "today", x: (minWidth || 0) / 2 } };
};
