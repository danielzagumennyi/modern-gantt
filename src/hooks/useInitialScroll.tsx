import { useEffect } from "react";
import { useChartStore } from "../chart/useChartStore";

export const useInitialScroll = () => {
  const { useStore } = useChartStore();
  const { todayElement, containerElement } = useStore(
    ({ todayElement, containerElement }) => ({
      todayElement,
      containerElement,
    }),
  );

  useEffect(() => {
    if (!todayElement || !containerElement) return;

    setTimeout(
      () => containerElement.scrollTo({ left: todayElement.offsetLeft - 100 }),
      0,
    );
  }, [containerElement, todayElement]);
};
