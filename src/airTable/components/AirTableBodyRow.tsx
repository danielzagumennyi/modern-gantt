import { AirTableBodyCell } from "./AirTableBodyCell";
import { IAirTableColumnDef } from "../AirTable";
import styles from "../AirTable.module.css";

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
          column={col}
          row={row}
          width={col.width}
        />
      ))}
    </tr>
  );
};
