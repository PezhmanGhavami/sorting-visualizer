import {
  sortTwo,
  swapTwo,
} from "./sorting-algorithms.utils";

//sorting algorithms copied from https://www.scien.cx/2022/03/16/sorting-algorithms-in-typescript/

interface ISortReturn {
  sortedArray: number[];
  animationArray: number[][];
}

//#region Insertion Sort
//Works
function insertionSort(arr: number[]): ISortReturn {
  const localArr = [...arr];
  const animationArray: number[][] = [];
  for (let i = 1; i < localArr.length; i++) {
    for (let j = i - 1; j > -1; j--) {
      sortTwo(localArr, j + 1, j, animationArray);
    }
  }
  return { sortedArray: localArr, animationArray };
}
//#endregion

//#region Bubble Sort
//Works
function bubbleSort(arr: number[]): ISortReturn {
  const localArr = [...arr];
  const animationArray: number[][] = [];
  for (let i = 0; i < localArr.length; i++) {
    for (let j = 0; j < localArr.length + i - 1; j++) {
      sortTwo(localArr, j + 1, j, animationArray);
    }
  }
  return { sortedArray: localArr, animationArray };
}
//#endregion

//#region Selection Sort
//Works
function selectionSort(arr: number[]): ISortReturn {
  const localArr = [...arr];
  const animationArray: number[][] = [];

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
      animationArray.push([...localArr]);
    }
  }

  return { sortedArray: localArr, animationArray };
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
  const animationArray: number[][] = [];
  const auxiliaryArray = localArr.slice();
  if (localArr.length <= 1) {
    return { sortedArray: localArr, animationArray };
  }
  callMerge(
    localArr,
    0,
    localArr.length - 1,
    auxiliaryArray,
    animationArray
  );

  return { sortedArray: localArr, animationArray };
}
//#endregion

//#region Quick Sort
function getPivotIdx(
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

function quickSort(
  arr: number[],
  left: number = 0,
  right: number = arr.length - 1
): number[] {
  if (left < right) {
    let pivotIndex = getPivotIdx(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}
//#endregion

export {
  insertionSort,
  mergeSort,
  bubbleSort,
  selectionSort,
  quickSort,
};
