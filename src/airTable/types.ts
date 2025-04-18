import { CSSProperties, ReactNode } from 'react';

export interface IAirTableProps<ITEM> {
  rows: ITEM[];
  columns: IAirTableColumnDef<ITEM>[];
  rowKey?: keyof ITEM;
}

export type AirTableColumnAlign = 'right' | 'left' | 'center';

export interface IAirTableColumnDef<ITEM> {
  field: string;
  header: ReactNode;
  style?: CSSProperties;
  styleHeader?: CSSProperties;
  hidden?: boolean;
  width?: number | string;
  render?: (
    item: ITEM,
    options: {
      rowHovered: boolean;
    },
  ) => ReactNode;
}
