import { memo } from 'react';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

import styles from './SidebarToggle.module.css';

export const SidebarToggle = memo(
  ({ opened, onClick }: { onClick?: () => void; opened?: boolean }) => {
    return (
      <div className={styles.toggle} data-opened={opened} onClick={onClick}>
        {opened ? <IconChevronLeft /> : <IconChevronRight />}
      </div>
    );
  },
);
