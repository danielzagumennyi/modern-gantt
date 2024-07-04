import { alpha } from "@mantine/core";
import { styled } from "styled-components";
import { convertPositionToStyle } from "../helpers";
import { useChartStore } from "../useChartStore";

export const Selection = ({ id }: { id: number | string }) => {
  const { useStore } = useChartStore();

  const position = useStore((s) => s.positions[id]);

  if (!position) return null;

  return <Root style={convertPositionToStyle(position)} />;
};

const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: ${alpha("var(--mantine-color-blue-0)", 0.5)};
  border-left: 1px solid var(--mantine-color-blue-2);
  border-right: 1px solid var(--mantine-color-blue-2);
`;
