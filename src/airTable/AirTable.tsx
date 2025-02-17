import type { ReactNode } from "react";
import { useMemo } from "react";

import styles from "./AirTable.module.css";
import { AirTableBodyRow } from "./components/AirTableBodyRow";

export interface IAirTableProps<ITEM> {
  rows: ITEM[];
  columns: IAirTableColumnDef<ITEM>[];
  rowKey?: keyof ITEM;
}

export type AirTableColumnAlign = "right" | "left" | "center";

export interface IAirTableColumnDef<ITEM> {
  field: string;
  header: ReactNode;
  align?: AirTableColumnAlign;
  hidden?: boolean;
  width?: number | string;
  render?: (item: ITEM) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AirTable = <ITEM extends Record<string, any>>({
  columns: _columns,
  rows,
  rowKey,
}: IAirTableProps<ITEM>) => {
  const columns = useMemo(() => {
    return _columns.filter((col) => !col.hidden);
  }, [_columns]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <th className={styles.header} key={col.field.toString()}>
                <div className={`${styles.cellContent} ${col.align}`}>
                  {col.header}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <AirTableBodyRow
              key={row[rowKey || columns[0].field]}
              row={row}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
