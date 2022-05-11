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

  const animateBubbleSort = () => {
    const { animationArray } = bubbleSort(theArray);
    let index = 0;

    console.log(animationArray);

    setTimeout(() => {
      setTheArray(animationArray[index++]);
    }, 30);
  };

  return (
    <>
      <div className="sorting-visualizer-container">
        <Nav
          resetTheArray={resetTheArray}
          bubbleSort={animateBubbleSort}
        />
        {/*NOTE -  bar-container can be it's own component */}
        <div className="bar-container">
          {theArray.map((value, index) => (
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
