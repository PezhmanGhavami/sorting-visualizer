import {
  swapTwo,
  addFrame,
  IAnimationData,
  BarColors,
} from "./sorting-algorithms.utils";

import { IBars } from "../../components/sorting-visualizer/sorting-visualizer.component";

interface ISortReturn {
  sortedArray: number[];
  animationData: IAnimationData;
}

//#region Bubble Sort
//Works
function bubbleSort(barData: IBars): ISortReturn {
  const localArr = [...barData.heights];
  const localColors = [...barData.colors];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };
  for (let indexA = 0; indexA < localArr.length; indexA++) {
    for (
      let indexB = 0;
      indexB < localArr.length - indexA - 1;
      indexB++
    ) {
      const a = indexB + 1;
      const b = indexB;
      if (localArr[a] < localArr[b]) {
        swapTwo(localArr, a, b);
        localColors[a] = BarColors.BEING_SORTED;
        localColors[b] = BarColors.BEING_COMPARED_AGAINST;
        addFrame(animationData, localArr, localColors);
        localColors[a] = BarColors.NOT_SORTED;
        localColors[b] = BarColors.NOT_SORTED;
      }
    }
    localColors[localArr.length - indexA - 1] =
      BarColors.SORTED;
    addFrame(animationData, localArr, localColors);
  }
  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Insertion Sort
//Works
function insertionSort(barData: IBars): ISortReturn {
  const localArr = [...barData.heights];
  const localColors = [...barData.colors];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };
  for (let indexA = 1; indexA < localArr.length; indexA++) {
    for (let indexB = indexA - 1; indexB > -1; indexB--) {
      const a = indexB + 1;
      const b = indexB;
      if (localArr[a] < localArr[b]) {
        swapTwo(localArr, a, b);
        const exColorA = localColors[a];
        const exColorB = localColors[b];

        localColors[a] = BarColors.BEING_COMPARED_AGAINST;
        localColors[b] = BarColors.BEING_SORTED;
        addFrame(animationData, localArr, localColors);
        localColors[a] = exColorA;
        localColors[b] = exColorB;
      }
    }
    localColors[indexA - 1] = BarColors.POTENTIALLY_SORTED;
    addFrame(animationData, localArr, localColors);
  }
  localColors[localColors.length - 1] =
    BarColors.POTENTIALLY_SORTED;
  addFrame(animationData, localArr, localColors);

  //Sort Compeleted
  localColors.fill(BarColors.SORTED);
  addFrame(animationData, localArr, localColors);
  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Selection Sort
//Works
function selectionSort(barData: IBars): ISortReturn {
  const localArr = [...barData.heights];
  const localColors = [...barData.colors];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };

  let currentMin: number;

  for (let indexA = 0; indexA < localArr.length; indexA++) {
    currentMin = indexA;
    localColors[indexA] = BarColors.POTENTIALLY_SORTED;
    addFrame(animationData, localArr, localColors);

    for (
      let indexB = indexA + 1;
      indexB < localArr.length;
      indexB++
    ) {
      localColors[indexB] =
        BarColors.BEING_COMPARED_AGAINST;
      addFrame(animationData, localArr, localColors);

      if (localArr[indexB] < localArr[currentMin]) {
        if (currentMin !== indexA) {
          localColors[currentMin] = BarColors.NOT_SORTED;
        }
        currentMin = indexB;
        localColors[currentMin] = BarColors.BEING_SORTED;
        addFrame(animationData, localArr, localColors);
      } else {
        localColors[indexB] = BarColors.NOT_SORTED;
      }
    }
    if (currentMin !== indexA) {
      swapTwo(localArr, currentMin, indexA);
    }
    addFrame(animationData, localArr, localColors);

    localColors[currentMin] = BarColors.NOT_SORTED;
    localColors[indexA] = BarColors.SORTED;
  }
  localColors[localColors.length - 1] = BarColors.SORTED;
  addFrame(animationData, localArr, localColors);

  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Heap Sort
//TODO - Add heap sort
//#endregion

//#region Merge Sort
function merge(
  localArr: number[],
  localColors: string[],
  animationData: IAnimationData,
  left: number,
  middle: number,
  right: number
): void {
  //size of left and right sub-arrays
  const leftArraySize = middle - left + 1;
  const rightArraySize = right - middle;

  const leftArr: number[] = new Array(leftArraySize);
  const rightArr: number[] = new Array(rightArraySize);

  //fill left and right sub-arrays
  for (let index = 0; index < leftArraySize; index++) {
    leftArr[index] = localArr[left + index];
  }
  for (let index = 0; index < rightArraySize; index++) {
    rightArr[index] = localArr[middle + 1 + index];
  }

  let indexOfLeftSubArray = 0;
  let indexOfRightSubArray = 0;
  let indexOfMergedArray = left;
  //marge temp arrays to real array

  while (
    indexOfLeftSubArray < leftArraySize &&
    indexOfRightSubArray < rightArraySize
  ) {
    const exColorM = localColors[indexOfMergedArray];
    if (
      leftArr[indexOfLeftSubArray] <=
      rightArr[indexOfRightSubArray]
    ) {
      const exColorL = localColors[indexOfLeftSubArray];
      localColors[indexOfLeftSubArray] =
        BarColors.BEING_COMPARED_AGAINST;
      localColors[indexOfMergedArray] =
        BarColors.BEING_SORTED;
      localArr[indexOfMergedArray] =
        leftArr[indexOfLeftSubArray];
      addFrame(animationData, localArr, localColors);
      localColors[indexOfLeftSubArray] = exColorL;

      indexOfLeftSubArray++;
    } else {
      const exColorR = localColors[indexOfRightSubArray];
      localColors[indexOfRightSubArray] =
        BarColors.BEING_COMPARED_AGAINST;
      localColors[indexOfMergedArray] =
        BarColors.BEING_SORTED;
      localArr[indexOfMergedArray] =
        rightArr[indexOfRightSubArray];
      addFrame(animationData, localArr, localColors);
      localColors[indexOfRightSubArray] = exColorR;

      indexOfRightSubArray++;
    }
    localColors[indexOfMergedArray] = exColorM;
    addFrame(animationData, localArr, localColors);

    indexOfMergedArray++;
  }

  while (indexOfLeftSubArray < leftArraySize) {
    //extra element in left array
    localArr[indexOfMergedArray] =
      leftArr[indexOfLeftSubArray];
    const exColorM = localColors[indexOfMergedArray];
    const exColorL = localColors[indexOfLeftSubArray];
    localColors[indexOfLeftSubArray] =
      BarColors.BEING_COMPARED_AGAINST;
    localColors[indexOfMergedArray] =
      BarColors.BEING_SORTED;
    addFrame(animationData, localArr, localColors);
    localColors[indexOfMergedArray] = exColorM;
    localColors[indexOfLeftSubArray] = exColorL;
    addFrame(animationData, localArr, localColors);

    indexOfLeftSubArray++;
    indexOfMergedArray++;
  }

  while (indexOfRightSubArray < rightArraySize) {
    //extra element in right array
    localArr[indexOfMergedArray] =
      rightArr[indexOfRightSubArray];
    const exColorM = localColors[indexOfMergedArray];
    const exColorR = localColors[indexOfRightSubArray];
    localColors[indexOfRightSubArray] =
      BarColors.BEING_COMPARED_AGAINST;
    localColors[indexOfMergedArray] =
      BarColors.BEING_SORTED;
    addFrame(animationData, localArr, localColors);
    localColors[indexOfMergedArray] = exColorM;
    localColors[indexOfRightSubArray] = exColorR;
    addFrame(animationData, localArr, localColors);

    indexOfRightSubArray++;
    indexOfMergedArray++;
  }
}

function callMerge(
  localArr: number[],
  localColors: string[],
  animationData: IAnimationData,
  start: number,
  end: number
): void {
  if (start < end) {
    const middle = Math.floor((start + end) / 2);
    //left side
    callMerge(
      localArr,
      localColors,
      animationData,
      start,
      middle
    );
    localColors.fill(
      BarColors.POTENTIALLY_SORTED,
      start,
      middle + 1
    );
    addFrame(animationData, localArr, localColors);
    //right side
    callMerge(
      localArr,
      localColors,
      animationData,
      middle + 1,
      end
    );
    localColors.fill(
      BarColors.POTENTIALLY_SORTED,
      middle + 1,
      end + 1
    );
    addFrame(animationData, localArr, localColors);

    //merge the arrays
    merge(
      localArr,
      localColors,
      animationData,
      start,
      middle,
      end
    );
  }
}

function mergeSort(barData: IBars): ISortReturn {
  const localArr = [...barData.heights];
  const localColors = [...barData.colors];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };
  if (localArr.length <= 1) {
    return { sortedArray: localArr, animationData };
  }

  callMerge(
    localArr,
    localColors,
    animationData,
    0,
    localArr.length - 1
  );

  localColors.fill(BarColors.SORTED);
  addFrame(animationData, localArr, localColors);

  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Quick Sort
function getPivotIndex(
  arr: number[],
  start: number = 0,
  end: number = arr.length - 1
): number {
  let swapIdx: number = start;
  let pivotValue: number = arr[start];
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivotValue) {
      swapIdx++;
      swapTwo(arr, i, swapIdx);
    }
  }
  swapTwo(arr, start, swapIdx);
  return swapIdx;
}

function runQuickSort(
  arr: number[],
  frame: number[],
  fColors: string[],
  aniData: IAnimationData,
  left: number = 0,
  right: number = arr.length - 1
): number[] {
  if (left < right) {
    let pivotIndex = getPivotIndex(arr, left, right);
    runQuickSort(
      arr,
      frame,
      fColors,
      aniData,
      left,
      pivotIndex - 1
    );
    runQuickSort(
      arr,
      frame,
      fColors,
      aniData,
      pivotIndex + 1,
      right
    );
  }
  return arr;
}

function quickSort(barData: IBars): ISortReturn {
  const localArr = [...barData.heights];
  const localColors = [...barData.colors];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };
  if (localArr.length <= 1) {
    return { sortedArray: localArr, animationData };
  }

  // runQuickSort(localArr);

  const sortedArray = runQuickSort(
    localArr,
    localArr,
    localColors,
    animationData
  );

  localColors.fill(BarColors.SORTED);
  addFrame(animationData, sortedArray, localColors);

  return { sortedArray, animationData };
}
//#endregion

export {
  insertionSort,
  mergeSort,
  bubbleSort,
  selectionSort,
  quickSort,
};
