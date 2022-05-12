import { useState, useEffect, useCallback } from "react";

import "./sorting-visualizer.styles.css";

import Bar from "../bar/bar.components";
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

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const SortingVisualizer = () => {
  const [barArray, setBarArray] = useState<number[]>([]);
  const [dataSeries, setDataSeries] = useState<number[][]>(
    []
  );
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
    barArray.length;

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
    setBarArray([...localArray]);
    setDataSeries([]);
    setDataSeriesIndex(0);
    const correctBarCount = getCorrectBarCount(barCount);
    correctBarCount !== barCount &&
      setBarCount(correctBarCount);
  }, [barHeightMax, barCount, getCorrectBarCount]);

  const runTheAnimation = useCallback(() => {
    if (dataSeriesIndex < dataSeries.length) {
      setTimeout(() => {
        setBarArray(dataSeries[dataSeriesIndex]);
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
    const { animationArray } = bubbleSort(barArray);
    setDataSeries([...animationArray]);
  };

  const animateInsertionSort = () => {
    const { animationArray } = insertionSort(barArray);
    setDataSeries([...animationArray]);
  };

  const animateSelectionSort = () => {
    const { animationArray } = selectionSort(barArray);
    setDataSeries([...animationArray]);
  };

  const animateMergeSort = () => {
    const { sortedArray, animationArray } =
      mergeSort(barArray);
    console.log(sortedArray);
    console.log(animationArray);
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
    const { sortedArray, animationArray } =
      quickSort(barArray);
    console.log(sortedArray);
    console.log(animationArray);
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
        {/*NOTE -  bar-container can be it's own component */}
        <div className="bar-container">
          {barArray.map((value, index) => (
            <Bar
              key={index}
              height={value}
              width={barWidth}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SortingVisualizer;
