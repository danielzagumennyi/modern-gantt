import { useMemo } from 'react';

import { AirTableBodyRow } from './components/AirTableBodyRow';
import { AirTableHeaderCell } from './components/AirTableHeaderCell';
import { IAirTableProps } from './types';

import styles from './AirTable.module.css';

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
        <thead className={styles.thead}>
          <tr className={styles.headerRow}>
            {columns.map((col) => (
              <AirTableHeaderCell key={col.field.toString()} column={col} />
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
