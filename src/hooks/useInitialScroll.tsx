import { useEffect, useState } from "react";

export const useInitialScroll = ({
  containerElement,
  todayElement,
}: {
  todayElement: HTMLDivElement | null;
  containerElement: HTMLElement | null;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    if (!(todayElement && containerElement)) return;

    setTimeout(
      () => containerElement.scrollTo({ left: todayElement.offsetLeft - 100 }),
      0,
    );

    setReady(true);
  }, [containerElement, ready, todayElement]);
};
