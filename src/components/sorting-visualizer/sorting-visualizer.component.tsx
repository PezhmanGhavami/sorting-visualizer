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
import {
  IAnimationData,
  BarColors,
} from "../../utils/sorting-algorithms/sorting-algorithms.utils";

const dataSeriesDefaultValue = {
  atFrame: [],
  atFrameColors: [],
};

export interface IBars {
  heights: number[];
  colors: string[];
}

const barsDefaultValue = {
  heights: [],
  colors: [],
};

const SortingVisualizer = () => {
  const [bars, setBars] = useState<IBars>(barsDefaultValue);
  const [dataSeries, setDataSeries] =
    useState<IAnimationData>(dataSeriesDefaultValue);
  const [dataSeriesIndex, setDataSeriesIndex] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [animationSpeed, setAnimationSpeed] = useState(250);
  const [barCount, setBarCount] = useState(10);

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
      colors: new Array(barCount).fill(
        BarColors.NOT_SORTED
      ),
      heights: [...localArray],
    }));
    setDataSeries((prev) => ({
      ...prev,
      ...dataSeriesDefaultValue,
    }));
    setDataSeriesIndex(0);
    const correctBarCount = getCorrectBarCount(barCount);
    correctBarCount !== barCount &&
      setBarCount(correctBarCount);
  }, [barHeightMax, barCount, getCorrectBarCount]);

  const runTheAnimation = useCallback(() => {
    if (dataSeriesIndex < dataSeries.atFrame.length) {
      setTimeout(() => {
        setBars({
          colors: [
            ...dataSeries.atFrameColors[dataSeriesIndex],
          ],
          heights: [...dataSeries.atFrame[dataSeriesIndex]],
        });
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
    const { animationData } = bubbleSort(bars);
    setDataSeries((prev) => ({
      ...prev,
      ...animationData,
    }));
  };

  const animateInsertionSort = () => {
    const { animationData } = insertionSort(bars);
    setDataSeries((prev) => ({
      ...prev,
      ...animationData,
    }));
  };

  const animateSelectionSort = () => {
    const { animationData } = selectionSort(bars);
    setDataSeries((prev) => ({
      ...prev,
      ...animationData,
    }));
  };

  const animateMergeSort = () => {
    const { animationData } = mergeSort(bars);
    setDataSeries((prev) => ({
      ...prev,
      ...animationData,
    }));
  };

  const animateQuickSort = () => {
    const { animationData } = quickSort(bars);
    setDataSeries((prev) => ({
      ...prev,
      ...animationData,
    }));
  };

  return (
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
  );
};

export default SortingVisualizer;
