import { useMemo } from "react";

import styles from "../AirTable.module.css";
import { IAirTableColumnDef } from "../types";
import { useChartStore } from "../../chart/useChartStore";

interface IProps<ITEM> {
  column: IAirTableColumnDef<ITEM>;
  row: ITEM;
  width?: number | string;
  rowHovered: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AirTableBodyCell = <ITEM extends Record<string, any>>({
  column,
  row,
  width,
  rowHovered,
}: IProps<ITEM>) => {
  const { api } = useChartStore();
  const render = useMemo(() => {
    if (column.render) {
      return column.render?.(row, { rowHovered }, api);
    }

    return row[column.field];
  }, [api, column, row, rowHovered]);

  return (
    <td className={styles.cell} width={width}>
      <div className={`${styles.cellContent} ${column.align}`}>
        {render || "-"}
      </div>
    </td>
  );
};
