import { useEffect, useState } from "react";
import { useChartStore } from "../chart/useChartStore";

export const useInitialScroll = () => {
  const [ready, setReady] = useState(false);
  const { useStore } = useChartStore();
  const { todayElement, containerElement } = useStore(
    ({ todayElement, containerElement }) => ({
      todayElement,
      containerElement,
    }),
  );

  useEffect(() => {
    if (ready) return;
    if (!todayElement || !containerElement) return;

    setTimeout(
      () => containerElement.scrollTo({ left: todayElement.offsetLeft - 100 }),
      0,
    );

    setReady(true);
  }, [containerElement, ready, todayElement]);
};
