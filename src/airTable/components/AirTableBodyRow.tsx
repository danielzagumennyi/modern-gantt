import { AirTableBodyCell } from "./AirTableBodyCell";
import styles from "../AirTable.module.css";
import { IAirTableColumnDef } from "../types";

interface IProps<ITEM> {
  row: ITEM;
  columns: IAirTableColumnDef<ITEM>[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AirTableBodyRow = <ITEM extends Record<string, any>>({
  row,
  columns,
}: IProps<ITEM>) => {
  return (
    <tr className={styles.row}>
      {columns.map((col) => (
        <AirTableBodyCell
          key={col.field.toString()}
          row={row}
          column={col}
          width={col.width}
        />
      ))}
    </tr>
  );
};
