import { PropsWithChildren, useEffect, useRef } from 'react';

import { useScrollStore } from '../scrollSync/scrollStore';

import styles from './Sidebar.module.css';

export const ScrollSync = ({ children }: PropsWithChildren) => {
  const scrollTop = useScrollStore((s) => s.scrollTop);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      useScrollStore.setState({ scrollTop: el.scrollTop });
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.horizontal_scroll}>
      <div className={styles.content} ref={ref}>
        {children}
      </div>
    </div>
  );
};
