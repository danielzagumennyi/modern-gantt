import type { ReactNode } from "react";
import { useMemo } from "react";

import styles from "./AirTable.module.css";

import { AirTableCell } from "./components/AirTableCell";

export interface IAirTableProps<ITEM> {
  data?: ITEM[];
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
  data,
  rowKey,
}: IAirTableProps<ITEM>) => {
  const columns = useMemo(() => {
    return _columns.filter((col) => !col.hidden);
  }, [_columns]);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        {/* <thead>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <th className={styles.header} key={col.field.toString()}>
                <div className={`${styles.cellContent} ${col.align}`}>
                  {col.header}
                </div>
              </th>
            ))}
          </tr>
        </thead> */}
        <tbody>
          {data?.map((row) => (
            <tr className={styles.row} key={row[rowKey || columns[0].field]}>
              {columns.map((col) => (
                <AirTableCell
                  key={col.field.toString()}
                  column={col}
                  row={row}
                  width={col.width}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
