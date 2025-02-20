import styles from "./Timeline.module.css";
import { HeaderGroup } from "./types.ts";

interface IProps {
  item: HeaderGroup;
  style?: React.CSSProperties;
}
export const TimelineHeader = ({ item, style }: IProps) => {
  return (
    <div className={styles.cell} style={style}>
      {item.title}
    </div>
  );
};
