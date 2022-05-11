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
} from "../../utils/sorting-algorithms/sorting-algorithms";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const SortingVisualizer = () => {
  const [displayArray, setDisplayArray] = useState<
    number[]
  >([]);
  const [dataSeries, setDataSeries] = useState<number[][]>(
    []
  );
  const [dataSeriesIndex, setDataSeriesIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const barHeightMax =
    windowDimensions.height - windowDimensions.height * 0.2;
  const barWidth =
    (windowDimensions.width -
      windowDimensions.width * 0.5) /
    displayArray.length;

  const resetDisplayArray = useCallback(() => {
    const localArray: number[] = [];
    for (let i = 0; i < 100; i++) {
      localArray.push(randomIntFromBound(barHeightMax));
    }
    setDisplayArray([...localArray]);
    setDataSeries([]);
    setDataSeriesIndex(0);
  }, [barHeightMax]);

  const runTheAnimation = useCallback(() => {
    if (dataSeriesIndex < dataSeries.length) {
      setTimeout(() => {
        setDisplayArray(dataSeries[dataSeriesIndex]);
        setDataSeriesIndex((prev) => prev + 1);
      }, 1); //the time is speed
    }
  }, [dataSeries, dataSeriesIndex]);

  useEffect(() => {
    resetDisplayArray();

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, [resetDisplayArray]);

  useEffect(() => {
    runTheAnimation();
  }, [runTheAnimation]);

  const animateBubbleSort = () => {
    const { animationArray } = bubbleSort(displayArray);
    setDataSeries([...animationArray]);
  };

  const animateInsertionSort = () => {
    const { animationArray } = insertionSort(displayArray);
    setDataSeries([...animationArray]);
  };

  const animateSelectionSort = () => {
    const { animationArray } = selectionSort(displayArray);
    setDataSeries([...animationArray]);
  };

  const animateMergeSort = () => {
    const { sortedArray, animationArray } =
      mergeSort(displayArray);
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
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animationArray[i];
          const barOne = arrayBars[
            barOneIdx
          ] as HTMLElement;
          barOne.style.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  return (
    <>
      <div className="sorting-visualizer-container">
        <Nav
          resetTheArray={resetDisplayArray}
          bubbleSort={animateBubbleSort}
          insertionSort={animateInsertionSort}
          selectionSort={animateSelectionSort}
          mergeSort={animateMergeSort}
        />
        {/*NOTE -  bar-container can be it's own component */}
        <div className="bar-container">
          {displayArray.map((value, index) => (
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
