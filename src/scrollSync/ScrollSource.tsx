import { PropsWithChildren, useEffect, useRef } from 'react';

import { preventDefault } from '../chart/helpers';
import { useChartStore } from '../chart/useChartStore';
import { useScrollStore } from './scrollStore';

export const ScrollSource = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const { useStore } = useChartStore();
  const isIdle = useStore((s) => !s.connecting && !s.dragging && !s.resizing);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      useScrollStore.setState({ scrollTop: el.scrollTop });
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;

    el?.addEventListener('drag', preventDefault);
    el?.addEventListener('drop', preventDefault);

    return () => {
      el?.removeEventListener('drag', preventDefault);
      el?.removeEventListener('drop', preventDefault);
    };
  }, [isIdle]);

  useEffect(() => {
    useStore.setState({
      containerElement: scrollRef.current,
    });

    return () => {
      useStore.setState({
        containerElement: null,
      });
    };
  }, [useStore]);

  return (
    <div className={className} ref={scrollRef}>
      {children}
    </div>
  );
};
