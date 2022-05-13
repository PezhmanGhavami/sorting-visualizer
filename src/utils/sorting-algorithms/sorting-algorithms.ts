import {
  swapTwo,
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
        localColors[b] = BarColors.BEING_SORTED;
        animationData.atFrameColors.push([...localColors]);
        localColors[a] = BarColors.NOT_SORTED;
        localColors[b] = BarColors.NOT_SORTED;
        animationData.atFrame.push([...localArr]);
      }
    }
    localColors[localArr.length - indexA - 1] =
      BarColors.SORTED;
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

        localColors[a] = BarColors.BEING_SORTED;
        localColors[b] = BarColors.BEING_SORTED;
        animationData.atFrameColors.push([...localColors]);
        localColors[a] = exColorA;
        localColors[b] = exColorB;
        animationData.atFrame.push([...localArr]);
      }
    }
    localColors[indexA - 1] = BarColors.POTENTIALLY_SORTED;
  }
  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Selection Sort
//Animation is wrong
function selectionSort(arr: number[]): ISortReturn {
  const localArr = [...arr];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };

  let min: number;
  for (let i = 0; i < localArr.length; i++) {
    min = i;
    for (let j = i + 1; j < localArr.length; j++) {
      if (localArr[j] < localArr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      swapTwo(localArr, min, i);
      animationData.atFrame.push([...localArr]);
      //Colors
      animationData.atFrameColors.push(
        new Array(localArr.length).fill(
          BarColors.NOT_SORTED
        )
      );
      const currentIndex =
        animationData.atFrameColors.length - 1;
      animationData.atFrameColors[currentIndex][min] =
        BarColors.BEING_SORTED;
      animationData.atFrameColors[currentIndex][i] =
        BarColors.BEING_SORTED;
    }
  }

  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Heap Sort
//NOTE - Add heap sort
//#endregion

//#region Merge Sort
function merge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: number[][]
): void {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function callMerge(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: number[][]
): void {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  callMerge(
    auxiliaryArray,
    startIdx,
    middleIdx,
    mainArray,
    animations
  );
  callMerge(
    auxiliaryArray,
    middleIdx + 1,
    endIdx,
    mainArray,
    animations
  );
  merge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
  );
}

function mergeSort(arr: number[]): ISortReturn {
  const localArr = [...arr];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };
  const auxiliaryArray = [...localArr];
  if (localArr.length <= 1) {
    return { sortedArray: localArr, animationData };
  }
  callMerge(
    localArr,
    0,
    localArr.length - 1,
    auxiliaryArray,
    animationData.atFrame
  );

  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Quick Sort
function getPivotIdx(
  arr: number[],
  start: number = 0,
  end: number = arr.length - 1,
  animationArray: number[][]
): number {
  let swapIdx: number = start;
  let pivotValue: number = arr[start];
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivotValue) {
      animationArray.push([start, swapIdx]);
      animationArray.push([start, swapIdx]);
      swapIdx++;
      swapTwo(arr, i, swapIdx);
    }
  }
  swapTwo(arr, start, swapIdx);
  animationArray.push([start, arr[swapIdx]]);
  return swapIdx;
}

function quickSortHelper(
  arr: number[],
  left: number = 0,
  right: number = arr.length - 1,
  animationArray: number[][]
): number[] {
  if (left < right) {
    let pivotIndex = getPivotIdx(
      arr,
      left,
      right,
      animationArray
    );
    quickSortHelper(
      arr,
      left,
      pivotIndex - 1,
      animationArray
    );
    quickSortHelper(
      arr,
      pivotIndex + 1,
      right,
      animationArray
    );
  }
  return arr;
}

function quickSort(arr: number[]): ISortReturn {
  const localArr = [...arr];
  const animationData: IAnimationData = {
    atFrame: [],
    atFrameColors: [],
  };
  if (localArr.length <= 1) {
    return { sortedArray: localArr, animationData };
  }

  quickSortHelper(
    localArr,
    0,
    localArr.length - 1,
    animationData.atFrame
  );

  return { sortedArray: localArr, animationData };
}
//#endregion

export {
  insertionSort,
  mergeSort,
  bubbleSort,
  selectionSort,
  quickSort,
};
