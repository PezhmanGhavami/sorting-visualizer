export interface IAnimationData {
  atFrame: number[][];
  atFrameColors: string[][];
}

export enum BarColors {
  NOT_SORTED = "steelblue",
  BEING_SORTED = "#48af69",
  BEING_COMPARED_AGAINST = "#af4876",
  SORTED = "green",
  POTENTIALLY_SORTED = "purple",
}

export const swapTwo = (
  list: number[],
  a: number,
  b: number
) => {
  [list[a], list[b]] = [list[b], list[a]];
};
