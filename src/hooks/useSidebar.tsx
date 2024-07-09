import { useResizeObserver } from "./useResizeObserver";

export const useSidebar = () => {
  const [ref, { width }] = useResizeObserver<HTMLDivElement>();

  const maxWidth = width / 2;

  return { ref, maxWidth, minWidth: 0 };
};
