import { useMemo } from "react";
import styled from "styled-components";

import type { AirTableColumnAlign, IAirTableColumnDef } from "../AirTable";

export interface IAirTableCellProps<ITEM> {
  column: IAirTableColumnDef<ITEM>;
  row: ITEM;
  width?: number | string;
}

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
    <Cell width={width}>
      <CellContent $align={column.align}>{render || "-"}</CellContent>
    </Cell>
  );
};

const alignRelation = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export const CellContent = styled.div<{ $align?: AirTableColumnAlign }>`
  display: flex;
  align-items: center;
  justify-content: ${(p) => alignRelation[p.$align || "left"]};
`;

export const Cell = styled.td`
  padding: 8px;
`;
