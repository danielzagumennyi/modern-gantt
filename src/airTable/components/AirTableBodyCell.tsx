import { useMemo } from 'react';

import { IAirTableColumnDef } from '../types';

import styles from '../AirTable.module.css';

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
  const render = useMemo(() => {
    if (column.render) {
      return column.render?.(row, { rowHovered });
    }

    return row[column.field];
  }, [column, row, rowHovered]);

  return (
    <td className={styles.cell} width={width}>
      <div className={styles.cellContent} style={column.style}>
        {render || '-'}
      </div>
    </td>
  );
};
