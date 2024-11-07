import { CSSProperties, memo } from "react";

import styles from "./ChartGroup.module.css";

export const ChartGroup = memo(({ color }: { color?: string | null }) => {
  return (
    <div
      className={styles.group}
      style={
        {
          "--group-bg": color,
        } as CSSProperties
      }
    >
      <div className={styles.line} />
      <svg
        data-left
        className={styles.corner}
        viewBox="0 0 13 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.5179 -3.83797e-07C12.0615 -5.887e-07 13.0232 1.67443 12.2455 3.00774L3.72755 17.6099C2.69892 19.3733 6.82989e-07 18.6436 6.73469e-07 16.6022L6.05373e-07 2C6.00222e-07 0.895431 0.895431 8.93547e-07 2 7.46921e-07L10.5179 -3.83797e-07Z" />
      </svg>
      <svg
        data-right
        className={styles.corner}
        viewBox="0 0 13 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2.48208 -7.93839e-08C0.938493 -4.19232e-07 -0.0232499 1.67443 0.754516 3.00774L9.27244 17.6099C10.3011 19.3733 13 18.6436 13 16.6022L13 2C13 0.895432 12.1046 2.03919e-06 11 1.79599e-06L2.48208 -7.93839e-08Z" />
      </svg>
    </div>
  );
});
