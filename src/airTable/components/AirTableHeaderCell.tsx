import styles from "../AirTable.module.css";
import { IAirTableColumnDef } from "../types";

interface IProps<ITEM> {
  column: IAirTableColumnDef<ITEM>;
}
export const AirTableHeaderCell = <ITEM extends Record<string, any>>({
  column,
}: IProps<ITEM>) => {
  return (
    <th className={styles.header}>
      <div className={`${styles.cellContent} ${column.align}`}>
        {column.header}
      </div>
    </th>
  );
};
