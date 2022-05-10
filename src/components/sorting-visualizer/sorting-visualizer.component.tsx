import { useState, useEffect, useCallback } from "react";

import "./sorting-visualizer.styles.css";

import Bar from "../bar/bar.components";
import Nav from "../nav/nav.component";

import {
  getWindowDimensions,
  randomIntFromBound,
} from "./sorting-visualizer.utils";

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
        <Nav resetTheArray={resetTheArray} />
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
