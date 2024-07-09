import { PropsWithChildren } from "react";
import { useChartComputed } from "../hooks/useChartComputed";
import { useProvideProps } from "../hooks/useProvideProps";
import { ChartProps } from "./types";

export const ChartProvider = ({
  children,
  ...props
}: PropsWithChildren<ChartProps>) => {
  useProvideProps(props);
  useChartComputed(props);

  return <>{children}</>;
};
