import {
  sortTwo,
  swapTwo,
} from "./sorting-algorithms.utils";

//sorting algorithms copied from https://www.scien.cx/2022/03/16/sorting-algorithms-in-typescript/

//#region Insertion Sort
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j > -1; j--) {
      sortTwo(arr, j + 1, j);
    }
  }
  return arr;
}
//#endregion

//#region Bubble Sort
function bubbleSort(arr: number[]): number[] {
  const localArr = [...arr];
  for (let i = 0; i < localArr.length; i++) {
    for (let j = 0; j < localArr.length + i - 1; j++) {
      sortTwo(localArr, j + 1, j);
    }
  }
  return localArr;
}
//#endregion

//#region Selection Sort
function selectionSort(arr: number[]): number[] {
  let min: number;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      swapTwo(arr, min, i);
    }
  }
  return arr;
}
//#endregion

//#region Merge Sort
function merge(list1: number[], list2: number[]): number[] {
  let merged: number[] = [],
    i: number = 0,
    j: number = 0;
  while (i < list1.length && j < list2.length) {
    if (list1[i] < list2[j]) {
      merged.push(list1[i]);
      i++;
    } else {
      merged.push(list2[j]);
      j++;
    }
  }
  while (i < list1.length) {
    merged.push(list1[i]);
    i++;
  }
  while (j < list2.length) {
    merged.push(list2[j]);
    j++;
  }
  return merged;
}

function mergeSort(list: number[]): number[] {
  if (list.length <= 1) return list;
  let mid = Math.floor(list.length / 2);
  let left: number[] = mergeSort(list.slice(0, mid));
  let right: number[] = mergeSort(list.slice(mid));
  return merge(left, right);
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
