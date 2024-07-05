import type { ReactNode } from "react";
import { useMemo } from "react";
import styled from "styled-components";

import { AirTableCell, Cell, CellContent } from "./components/AirTableCell";

export interface IAirTableProps<ITEM> {
  data?: ITEM[];
  columns: IAirTableColumnDef<ITEM>[];
  rowKey?: keyof ITEM;
  className?: string;
}

export type AirTableColumnAlign = "right" | "left" | "center";

export interface IAirTableColumnDef<ITEM> {
  field: keyof ITEM;
  header: ReactNode;
  align?: AirTableColumnAlign;
  hidden?: boolean;
  width?: number | string;
  render?: (item: ITEM) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _AirTable = <ITEM extends Record<string, any>>({
  columns: _columns,
  data,
  rowKey,
  className,
}: IAirTableProps<ITEM>) => {
  const columns = useMemo(() => {
    return _columns.filter((col) => !col.hidden);
  }, [_columns]);

  return (
    <Wrapper className={className}>
      <Table>
        <thead>
          <HeaderRow>
            {columns.map((col) => (
              <Header key={col.field.toString()}>
                <CellContent $align={col.align}>{col.header}</CellContent>
              </Header>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {data?.map((row) => (
            <Row key={row[rowKey || columns[0].field]}>
              {columns.map((col) => (
                <AirTableCell
                  key={col.field.toString()}
                  column={col}
                  row={row}
                  width={col.width}
                />
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

const HeaderRow = styled.tr`
  border: none;
`;

const Row = styled.tr`
  border: none;
  border-bottom: 1px solid var(--mantine-color-gray-1);
`;

const Header = styled.th`
  padding: 8px;
  color: var(--mantine-color-black);
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
`;

export const AirTable = Object.assign(_AirTable, {
  Wrapper,
  Row,
  HeaderRow,
  Header,
  Cell,
  Table,
});
