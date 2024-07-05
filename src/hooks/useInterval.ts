import { useCallback, useRef } from "react";

export function useInterval() {
  const intervalRef = useRef<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const set = useCallback((listener: Function, duration: number) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return [set, clear] as const;
}
