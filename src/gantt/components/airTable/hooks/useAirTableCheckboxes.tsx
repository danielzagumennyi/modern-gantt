import { NewCheckbox } from "@helium10/re-ui-components";
import { useEffect, useMemo } from "react";

import type { IAirTableColumnDef } from "../AirTable";

const defaultDetId = (item: any) => item.id;

export type UseAirTableCheckboxesProps<ITEM, ID extends string | number = string | number> = {
  selected?: ID[];
  setSelected?: (v: ID[]) => void;
  getId?: (item: ITEM) => ID;
  data?: ITEM[];
  disableHeader?: boolean;
};

export const useAirTableCheckboxes = <ITEM, ID extends string | number = string | number>({
  selected,
  setSelected,
  getId = defaultDetId,
  data,
  disableHeader,
}: UseAirTableCheckboxesProps<ITEM, ID>) => {
  const allSelected = useMemo(
    () => data?.every((item) => selected?.includes(getId(item))),
    [data, getId, selected],
  );

  const hasSelected = useMemo(
    () => data?.some((item) => selected?.includes(getId(item))),
    [data, getId, selected],
  );

  useEffect(() => {
    setSelected?.([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const selectColumn: IAirTableColumnDef<any> = {
    field: "__checkbox__",
    header: data?.length ? (
      <NewCheckbox
        readOnly
        disabled={disableHeader}
        checked={hasSelected}
        indeterminate={hasSelected && !allSelected}
        onChange={() => {
          if (hasSelected) {
            setSelected?.([]);
          } else {
            setSelected?.(data?.map(getId) || []);
          }
        }}
      />
    ) : null,
    render: (item) => {
      const id = getId(item);
      const isSelected = selected?.includes(id);
      return (
        <NewCheckbox
          checked={isSelected}
          onChange={() => {
            if (isSelected) {
              setSelected?.(selected?.filter((item) => item !== id) || []);
            } else {
              setSelected?.([...(selected || []), id]);
            }
          }}
        />
      );
    },
  };

  return {
    selectColumn,
  };
};
