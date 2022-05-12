export interface IAnimationData {
  atFrame: number[][];
  selectedItems: number[][];
  pointer: number[];
}

export const swapTwo = (
  list: number[],
  a: number,
  b: number
) => {
  [list[a], list[b]] = [list[b], list[a]];
};

export const sortTwo = (
  list: number[],
  a: number,
  b: number,
  animationData: IAnimationData
) => {
  if (list[a] < list[b]) {
    animationData.selectedItems.push([a, b]);
    swapTwo(list, a, b);
    animationData.selectedItems.push([a, b]);
    animationData.atFrame.push([...list]);
  }
};
