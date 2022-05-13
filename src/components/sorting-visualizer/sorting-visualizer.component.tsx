import { useState, useEffect, useCallback } from "react";

import "./sorting-visualizer.styles.css";

import BarContainer from "../bar-container/bar-container.component";
import Nav from "../nav/nav.component";

import {
  getWindowDimensions,
  randomIntFromBound,
} from "./sorting-visualizer.utils";
import {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
} from "../../utils/sorting-algorithms/sorting-algorithms";
import { IAnimationData } from "../../utils/sorting-algorithms/sorting-algorithms.utils";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const dataSeriesDefaultValue = {
  atFrame: [],
  selectedItems: [],
  pointer: [],
};

export interface IBars {
  heights: number[];
  colors: string[];
}

const barsDefaultValue = {
  heights: [],
  colors: [],
};

// const toggleColorForIndex = (
//   arr: string[],
//   index: number
// ) => {
//   const localArr = [...arr];
//   if (localArr[index] === PRIMARY_COLOR) {
//     localArr[index] = SECONDARY_COLOR;
//   } else {
//     localArr[index] = PRIMARY_COLOR;
//   }

//   return localArr;
// };

const SortingVisualizer = () => {
  const [bars, setBars] = useState<IBars>(barsDefaultValue);
  const [dataSeries, setDataSeries] =
    useState<IAnimationData>(dataSeriesDefaultValue);
  const [dataSeriesIndex, setDataSeriesIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [animationSpeed, setAnimationSpeed] = useState(30);
  const [barCount, setBarCount] = useState(20);

  const maxBarsForWidth = Math.floor(
    windowDimensions.width / 5
  );

  const barHeightMax =
    windowDimensions.height - windowDimensions.height * 0.2;
  const barWidth =
    (windowDimensions.width -
      windowDimensions.width * 0.5) /
    bars.heights.length;

  const getCorrectBarCount = useCallback(
    (currentBars: number): number => {
      if (currentBars > maxBarsForWidth) {
        return maxBarsForWidth;
      }
      if (currentBars < 2) {
        return 2;
      }
      return currentBars;
    },
    [maxBarsForWidth]
  );

  const restBarArray = useCallback(() => {
    const localArray: number[] = [];
    for (let i = 0; i < barCount; i++) {
      localArray.push(randomIntFromBound(barHeightMax));
    }
    setBars((prev) => ({
      ...prev,
      colors: new Array(barCount).fill(PRIMARY_COLOR),
      heights: [...localArray],
    }));
    setDataSeries(dataSeriesDefaultValue);
    setDataSeriesIndex(0);
    const correctBarCount = getCorrectBarCount(barCount);
    correctBarCount !== barCount &&
      setBarCount(correctBarCount);
  }, [barHeightMax, barCount, getCorrectBarCount]);

  const runTheAnimation = useCallback(() => {
    if (dataSeriesIndex < dataSeries.atFrame.length) {
      setTimeout(() => {
        // const newColors =
        setBars((prev) => ({
          ...prev,
          heights: [...dataSeries.atFrame[dataSeriesIndex]],
        }));
        setDataSeriesIndex((prev) => prev + 1);
      }, animationSpeed);
    }
  }, [dataSeries, dataSeriesIndex, animationSpeed]);

  useEffect(() => {
    restBarArray();

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, [restBarArray]);

  useEffect(() => {
    runTheAnimation();
  }, [runTheAnimation]);

  const changeAnimationSpeed = (value: number) => {
    setAnimationSpeed(value);
  };

  const changeBarCount = (value: number) => {
    setBarCount(getCorrectBarCount(value));
  };

  const animateBubbleSort = () => {
    const { animationData } = bubbleSort(bars.heights);
    setDataSeries({ ...animationData });
  };

  const animateInsertionSort = () => {
    const { animationData } = insertionSort(bars.heights);
    setDataSeries({ ...animationData });
  };

  const animateSelectionSort = () => {
    const { animationData } = selectionSort(bars.heights);
    setDataSeries({ ...animationData });
  };

  const animateMergeSort = () => {
    const { animationData } = mergeSort(bars.heights);
    const animationArray = animationData.atFrame;
    // console.log(sortedArray);
    // console.log(animationArray);
    // setDataSeries([...animationArray]);

    for (let i = 0; i < animationArray.length; i++) {
      const arrayBars =
        document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animationArray[i];
        const barOne = arrayBars[barOneIdx] as HTMLElement;
        const barTwo = arrayBars[barTwoIdx] as HTMLElement;
        const color =
          i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOne.style.backgroundColor = color;
          barTwo.style.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animationArray[i];
          const barOne = arrayBars[
            barOneIdx
          ] as HTMLElement;
          barOne.style.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  };

  const animateQuickSort = () => {
    const { animationData } = quickSort(bars.heights);
    const animationArray = animationData.atFrame;
    // console.log(sortedArray);
    // console.log(animationArray);
    // setDataSeries([...animationArray]);

    for (let i = 0; i < animationArray.length; i++) {
      const arrayBars =
        document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animationArray[i];
        const barOne = arrayBars[barOneIdx] as HTMLElement;
        const barTwo = arrayBars[barTwoIdx] as HTMLElement;
        const color =
          i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOne.style.backgroundColor = color;
          barTwo.style.backgroundColor = color;
        }, i * animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animationArray[i];
          const barOne = arrayBars[
            barOneIdx
          ] as HTMLElement;
          barOne.style.height = `${newHeight}px`;
        }, i * animationSpeed);
      }
    }
  };

  return (
    <>
      <div className="sorting-visualizer-container">
        <Nav
          resetTheArray={restBarArray}
          changeAnimationSpeed={changeAnimationSpeed}
          changeBarCount={changeBarCount}
          bubbleSort={animateBubbleSort}
          insertionSort={animateInsertionSort}
          selectionSort={animateSelectionSort}
          mergeSort={animateMergeSort}
          quickSort={animateQuickSort}
          barInfo={{ maxBarsForWidth, barCount }}
          animationSpeed={animationSpeed}
        />
        <BarContainer bars={bars} barWidth={barWidth} />
      </div>
    </>
  );
};

export default SortingVisualizer;
