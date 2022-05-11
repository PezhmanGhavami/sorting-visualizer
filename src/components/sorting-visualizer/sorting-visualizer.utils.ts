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

const animateDataSeries = () => {};

export {
  randomIntFromBound,
  getWindowDimensions,
  animateDataSeries,
};
