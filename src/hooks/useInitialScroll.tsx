import { useState, useEffect } from "react";
import { isNumberValue } from "../chart/helpers";
import { BarDefinition } from "../chart/types";
import { ChartApi } from "../chart/store";

export const useInitialScroll = (data: BarDefinition[], api: ChartApi) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const sorted = [...data].sort((a, b) => {
      if (!isNumberValue(a.x1)) {
        return 1;
      }

      if (!isNumberValue(b.x1)) {
        return -1;
      }

      return a.x1 - b.x1;
    });

    if (!sorted[0]) return;

    setTimeout(() => api.scrollTo(sorted[0].id), 0);

    setReady(true);
  }, [api, data, ready]);
};
