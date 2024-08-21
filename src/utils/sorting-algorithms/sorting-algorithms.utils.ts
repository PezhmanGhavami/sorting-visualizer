import { TAnimationData } from "../../components/sorting-visualizer/sorting-visualizer.utils";

export const swapTwo = (list: number[], a: number, b: number) => {
  [list[a], list[b]] = [list[b], list[a]];
};

export const addFrame = (
  animationData: TAnimationData,
  frame: number[],
  frameColors: string[]
) => {
  animationData.atFrame.push([...frame]);
  animationData.atFrameColors.push([...frameColors]);
};
