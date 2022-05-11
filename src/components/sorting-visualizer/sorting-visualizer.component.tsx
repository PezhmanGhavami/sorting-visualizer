import { useState, useEffect, useCallback } from "react";

import "./sorting-visualizer.styles.css";

import Bar from "../bar/bar.components";
import Nav from "../nav/nav.component";

import {
  getWindowDimensions,
  randomIntFromBound,
} from "./sorting-visualizer.utils";
import { bubbleSort } from "../../utils/sorting-algorithms/sorting-algorithms";

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
    if (dataSeriesIndex < dataSeries.length - 1) {
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

  return (
    <>
      <div className="sorting-visualizer-container">
        <Nav
          resetTheArray={resetDisplayArray}
          bubbleSort={animateBubbleSort}
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
