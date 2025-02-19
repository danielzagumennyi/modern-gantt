import styles from "../AirTable.module.css";
import { IAirTableColumnDef } from "../types";

interface IProps<ITEM> {
  column: IAirTableColumnDef<ITEM>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AirTableHeaderCell = <ITEM extends Record<string, any>>({
  column,
}: IProps<ITEM>) => {
  return (
    <th className={styles.header}>
      <div className={styles.cellContent} style={column.styleHeader}>
        {column.header}
      </div>
    </th>
  );
};
