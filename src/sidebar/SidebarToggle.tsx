import { memo } from 'react';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import { useSidebar } from '../chart/store';

import styles from './SidebarToggle.module.css';

export const SidebarToggle = memo(() => {
  const opened = useSidebar((s) => s.sidebarOpened);

  return (
    <div
      className={styles.toggle}
      data-opened={opened}
      onClick={() =>
        useSidebar.setState((prev) => ({
          ...prev,
          sidebarOpened: !prev.sidebarOpened,
        }))
      }
    >
      {opened ? <IconChevronLeft /> : <IconChevronRight />}
    </div>
  );
});
