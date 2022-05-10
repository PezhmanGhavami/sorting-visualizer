import { useState, useEffect, useCallback } from "react";

import "./sorting-visualizer.styles.css";

import Bar from "../bar/bar.components";

//returns a random number between min and max (both included); if we don't want the max bound to be included, we can simply remove the plus one
function randomIntFromBound(
  maxBound: number,
  minBound: number = 5
): number {
  return (
    Math.floor(Math.random() * (maxBound - minBound + 1)) +
    minBound
  );
}

function getWindowDimensions() {
  const { clientWidth: width, clientHeight: height } =
    document.documentElement;
  return {
    width,
    height,
  };
}

const SortingVisualizer = () => {
  const [theArray, setTheArray] = useState<number[]>([]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const barHeightMax =
    windowDimensions.height - windowDimensions.height * 0.2;
  const barWidth =
    (windowDimensions.width -
      windowDimensions.width * 0.5) /
    theArray.length;

  const resetTheArray = useCallback(() => {
    const localArray: number[] = [];
    for (let i = 0; i < 100; i++) {
      localArray.push(randomIntFromBound(barHeightMax));
    }
    setTheArray([...localArray]);
  }, [barHeightMax]);

  useEffect(() => {
    resetTheArray();

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, [resetTheArray]);

  return (
    <>
      <div className="sorting-visualizer-container">
        <div className="nav">
          <button onClick={resetTheArray}>
            Generate New Array
          </button>
        </div>
        <div className="bar-container">
          {theArray.map((value, index) => (
            <Bar
              key={index}
              height={value}
              width={barWidth}
            />
          ))}
        </div>
        {/* <button onClick={() => mergeSort()}>
          Merge Sort
        </button> */}
        {/* <button onClick={() => quickSort()}>
          Quick Sort
        </button>
        <button onClick={() => heapSort()}>
          Heap Sort
        </button>
        <button onClick={() => bubbleSort()}>
          Bubble Sort
        </button> */}
        {/* <button
          onClick={() => testSortingAlgorithms()}
        >
          Test Sorting Algorithms (BROKEN)
        </button> */}
      </div>
    </>
  );
};

export default SortingVisualizer;
