import { PropsWithChildren, useEffect, useRef } from 'react';

import { useScrollStore } from '../scrollSync/scrollStore';

import styles from './Sidebar.module.css';

export const ScrollSync = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollTop = useScrollStore((s) => s.scrollTop);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  return (
    <div className={styles.content} ref={ref}>
      {children}
    </div>
  );
};
