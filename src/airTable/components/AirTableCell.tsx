import { useMemo } from "react";

import type { IAirTableColumnDef } from "../AirTable";

export interface IAirTableCellProps<ITEM> {
  column: IAirTableColumnDef<ITEM>;
  row: ITEM;
  width?: number | string;
}

import styles from "../AirTable.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AirTableCell = <ITEM extends Record<string, any>>({
  column,
  row,
  width,
}: IAirTableCellProps<ITEM>) => {
  const render = useMemo(() => {
    if (column.render) {
      return column.render?.(row);
    }

    const value = row[column.field];

    return value;
  }, [column, row]);

  return (
    <td className={styles.cell} width={width}>
      <div className={`${styles.cellContent} ${column.align}`}>
        {render || "-"}
      </div>
    </td>
  );
};
