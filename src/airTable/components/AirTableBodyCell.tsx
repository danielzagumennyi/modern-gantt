import { useMemo } from "react";

import styles from "../AirTable.module.css";
import { IAirTableColumnDef } from "../types";

interface IProps<ITEM> {
  column: IAirTableColumnDef<ITEM>;
  row: ITEM;
  width?: number | string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AirTableBodyCell = <ITEM extends Record<string, any>>({
  column,
  row,
  width,
}: IProps<ITEM>) => {
  const render = useMemo(() => {
    if (column.render) {
      return column.render?.(row);
    }

    return row[column.field];
  }, [column, row]);

  return (
    <td className={styles.cell} width={width}>
      <div className={`${styles.cellContent} ${column.align}`}>
        {render || "-"}
      </div>
    </td>
  );
};
