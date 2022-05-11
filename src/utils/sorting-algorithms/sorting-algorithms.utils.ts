const swapTwo = (list: number[], a: number, b: number) => {
  [list[a], list[b]] = [list[b], list[a]];
};

const sortTwo = (
  list: number[],
  a: number,
  b: number,
  moveList: number[][]
) => {
  if (list[a] < list[b]) {
    swapTwo(list, a, b);
    moveList.push([...list]);
  }
};

export { swapTwo, sortTwo };
