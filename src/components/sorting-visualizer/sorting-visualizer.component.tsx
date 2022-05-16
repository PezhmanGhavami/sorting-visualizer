import { useState, useEffect, useCallback } from "react";

import "./sorting-visualizer.styles.css";

import BarContainer from "../bar-container/bar-container.component";
import Nav from "../nav/nav.component";

import {
  IBars,
  BarColors,
  IAnimationData,
  IAnimationState,
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

const dataSeriesDefaultValue = {
  atFrame: [],
  atFrameColors: [],
};

const barsDefaultValue = {
  heights: [],
  colors: [],
};

const animationStateDefaultValue = {
  frameDelay: 250,
  maxFrameDelay: 500,
  minFrameDelay: 1,
  currentFrame: 0,
  playback: false,
  stop: false,
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
  const [animationState, setAnimationState] =
    useState<IAnimationState>(animationStateDefaultValue);
  const [barCount, setBarCount] = useState(10);
  const [playAnimation, setPlayAnimation] = useState(false);

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
    if (
      dataSeriesIndex < dataSeries.atFrame.length &&
      playAnimation
    ) {
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
  }, [
    dataSeries,
    dataSeriesIndex,
    animationSpeed,
    playAnimation,
  ]);

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
    value = value > 500 ? 500 : value < 1 ? 1 : value;
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
        playAnimation={playAnimation}
        animationSpeed={animationSpeed}
        animationFrames={dataSeries.atFrame.length}
        currentFrame={dataSeriesIndex}
      />
      <BarContainer bars={bars} barWidth={barWidth} />
    </div>
  );
};

export default SortingVisualizer;
