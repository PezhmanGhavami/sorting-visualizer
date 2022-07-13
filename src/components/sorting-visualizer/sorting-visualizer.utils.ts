export interface IAnimationData {
  atFrame: number[][];
  atFrameColors: string[][];
}

export interface IBars {
  heights: number[];
  colors: string[];
}

export interface IAnimationState {
  frameDelay: number;
  maxFrameDelay: number;
  minFrameDelay: number;
  currentFrame: number;
  playback: boolean;
}

export enum BarColors {
  NOT_SORTED = "#247dc7",
  BEING_SORTED = "#48af69",
  BEING_COMPARED_AGAINST = "#af4876",
  SORTED = "green",
  POTENTIALLY_SORTED = "purple",
  SELECTED = "red",
}

//returns a random number between min and max (both included); if we don't want the max bound to be included, we can simply remove the plus one
const randomIntFromBound = (
  maxBound: number,
  minBound: number = 5
): number => {
  return (
    Math.floor(Math.random() * (maxBound - minBound + 1)) +
    minBound
  );
};

const getWindowDimensions = () => {
  const { clientWidth: width, clientHeight: height } =
    document.documentElement;
  return {
    width,
    height,
  };
};

export { randomIntFromBound, getWindowDimensions };
