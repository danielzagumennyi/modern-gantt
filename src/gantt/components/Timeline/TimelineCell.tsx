import styles from "./Timeline.module.css";
import { HeaderGroup } from "./types.ts";

interface IProps {
  item: HeaderGroup;
  style?: React.CSSProperties;
}
export const TimelineCell = ({ item, style }: IProps) => {
  return (
    <div
      className={styles.cell}
      style={style}
      data-weekend={item.weekend}
      data-today={item.today}
    >
      {item.title}
    </div>
  );
};
