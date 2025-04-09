import { CSSProperties, PropsWithChildren } from 'react';

import { DEFAULT_ROW_HEIGHT } from '../../gantt';

import styles from './Layout.module.css';

export const ThemeProvider = ({
  rowHeight = DEFAULT_ROW_HEIGHT,
  children,
  className,
  style,
}: PropsWithChildren<{
  rowHeight?: number;
  className?: string;
  style?: CSSProperties;
}>) => {
  return (
    <div
      className={`${styles.provider} ${className || ''}`}
      style={
        {
          '--row-height': rowHeight + 'px',
          '--sidebar-active-resize-color': '#339af0',

          '--header-height': '50px',
          '--bar-height': '24px',

          '--border-radius': '6px',

          '--border-color-light': '#dee2e6',
          '--border-color-dark': '#424242',

          '--header-bg-light': '#fff',
          '--header-bg-dark': '#242424',
          '--header-bg-dark-weekend': '#2E2E2E',
          '--header-bg-light-weekend': '#f1f3f5',

          '--row-odd-bg-light': '#f8f9fa',
          '--row-odd-bg-dark': '#242424',
          '--row-even-bg-light': '#f1f3f5',
          '--row-even-bg-dark': '#1f1f1f',

          '--bar-bg': '#339af0',
          '--creation-bg': '#a5d8ff',
          '--group-bg': '#ff922b',

          '--text-size': '12px',

          '--dep-color': '#adb5bd',
          '--dep-hover-color': 'black',
          '--invalid-dep-color': '#fa5252',
          '--dep-width': '2px',

          '--resize-handle-bg': '#1c7ed6',
          '--resize-handle-inner-bg': '#fff',

          '--label-bg': '#ced4da',
          '--label-color': '#343a40',

          '--connect-color': '#228be6',
          '--connect-inner-color': '#fff',
          '--valid-connect-color': '#40c057',

          '--selection-bg': 'rgba(51, 154, 240, 0.1)',
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
};
