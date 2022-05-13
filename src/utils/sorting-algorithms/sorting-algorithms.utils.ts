export interface IAnimationData {
  atFrame: number[][];
  atFrameColors: string[][];
  pointer: number[];
}

export enum BarColors {
  PRIMARY_COLOR = "steelblue",
  SECONDARY_COLOR = "red",
  FINISHED_COLOR = "green",
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
    animationData.atFrameColors.push(
      new Array(list.length).fill(BarColors.PRIMARY_COLOR)
    );
    const currentIndex =
      animationData.atFrameColors.length - 1;
    // animationData.atFrameColors[currentIndex][a] =
    //   TEST_COLOR;
    animationData.atFrameColors[currentIndex][b] =
      BarColors.SECONDARY_COLOR;
    swapTwo(list, a, b);
    animationData.atFrame.push([...list]);
  }
};
