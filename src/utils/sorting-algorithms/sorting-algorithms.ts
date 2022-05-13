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
        localColors[b] = BarColors.BEING_COMPARED_AGAINST;
        animationData.atFrameColors.push([...localColors]);
        localColors[a] = BarColors.NOT_SORTED;
        localColors[b] = BarColors.NOT_SORTED;
        animationData.atFrame.push([...localArr]);
      }
    }
    localColors[localArr.length - indexA - 1] =
      BarColors.SORTED;
    animationData.atFrame.push([...localArr]);
    animationData.atFrameColors.push([...localColors]);
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
        animationData.atFrameColors.push([...localColors]);
        localColors[a] = exColorA;
        localColors[b] = exColorB;
        animationData.atFrame.push([...localArr]);
      }
    }
    localColors[indexA - 1] = BarColors.POTENTIALLY_SORTED;
    animationData.atFrame.push([...localArr]);
    animationData.atFrameColors.push([...localColors]);
  }
  localColors[localColors.length - 1] =
    BarColors.POTENTIALLY_SORTED;
  animationData.atFrame.push([...localArr]);
  animationData.atFrameColors.push([...localColors]);

  //Sort Compeleted
  localColors.fill(BarColors.SORTED);
  animationData.atFrame.push([...localArr]);
  animationData.atFrameColors.push([...localColors]);
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
    animationData.atFrame.push([...localArr]);
    animationData.atFrameColors.push([...localColors]);
    for (
      let indexB = indexA + 1;
      indexB < localArr.length;
      indexB++
    ) {
      localColors[indexB] =
        BarColors.BEING_COMPARED_AGAINST;
      animationData.atFrame.push([...localArr]);
      animationData.atFrameColors.push([...localColors]);
      if (localArr[indexB] < localArr[currentMin]) {
        if (currentMin !== indexA) {
          localColors[currentMin] = BarColors.NOT_SORTED;
        }
        currentMin = indexB;
        localColors[currentMin] = BarColors.BEING_SORTED;
        animationData.atFrame.push([...localArr]);
        animationData.atFrameColors.push([...localColors]);
      } else {
        localColors[indexB] = BarColors.NOT_SORTED;
      }
    }
    if (currentMin !== indexA) {
      swapTwo(localArr, currentMin, indexA);
    }
    animationData.atFrameColors.push([...localColors]);
    localColors[currentMin] = BarColors.NOT_SORTED;
    localColors[indexA] = BarColors.SORTED;
    animationData.atFrame.push([...localArr]);
  }
  localColors[localColors.length - 1] = BarColors.SORTED;
  animationData.atFrame.push([...localArr]);
  animationData.atFrameColors.push([...localColors]);

  return { sortedArray: localArr, animationData };
}
//#endregion

//#region Heap Sort
//TODO - Add heap sort
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

function callMerge(list: number[]): number[] {
  if (list.length <= 1) return list;
  let mid = Math.floor(list.length / 2);
  let left: number[] = callMerge(list.slice(0, mid));
  let right: number[] = callMerge(list.slice(mid));
  return merge(left, right);
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
  callMerge(localArr);

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
  left: number = 0,
  right: number = arr.length - 1
): number[] {
  if (left < right) {
    let pivotIndex = getPivotIndex(arr, left, right);
    runQuickSort(arr, left, pivotIndex - 1);
    runQuickSort(arr, pivotIndex + 1, right);
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

  runQuickSort(localArr);

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
