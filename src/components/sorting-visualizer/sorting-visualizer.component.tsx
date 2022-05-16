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
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [animationState, setAnimationState] =
    useState<IAnimationState>(animationStateDefaultValue);
  const [barCount, setBarCount] = useState(10);

  const {
    frameDelay,
    maxFrameDelay,
    minFrameDelay,
    currentFrame,
    playback,
    stop,
  } = animationState;

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
    setAnimationState((prev) => ({
      ...prev,
      currentFrame: 0,
      playback: false,
      stop: false,
    }));
    const correctBarCount = getCorrectBarCount(barCount);
    correctBarCount !== barCount &&
      setBarCount(correctBarCount);
  }, [barHeightMax, barCount, getCorrectBarCount]);

  const runTheAnimation = useCallback(() => {
    if (currentFrame < dataSeries.atFrame.length && !stop) {
      if (playback) {
        setTimeout(() => {
          setBars({
            colors: [
              ...dataSeries.atFrameColors[currentFrame],
            ],
            heights: [...dataSeries.atFrame[currentFrame]],
          });
          setAnimationState((prev) => ({
            ...prev,
            currentFrame: prev.currentFrame + 1,
          }));
        }, frameDelay);
      } else {
        setBars({
          colors: [
            ...dataSeries.atFrameColors[currentFrame],
          ],
          heights: [...dataSeries.atFrame[currentFrame]],
        });
      }
    }
  }, [
    dataSeries,
    currentFrame,
    frameDelay,
    playback,
    stop,
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
    value =
      value > maxFrameDelay
        ? 500
        : value < minFrameDelay
        ? 1
        : value;
    setAnimationState((prev) => ({
      ...prev,
      frameDelay: value,
    }));
  };

  const changeBarCount = (value: number) => {
    setBarCount(getCorrectBarCount(value));
  };

  const changeCurrentFrame = (value: number) => {
    value =
      value > dataSeries.atFrame.length
        ? dataSeries.atFrame.length
        : value < 0
        ? 0
        : value;
    setAnimationState((prev) => ({
      ...prev,
      currentFrame: value,
    }));
  };

  const togglePlayback = () => {
    setAnimationState((prev) => ({
      ...prev,
      playback: !prev.playback,
    }));
  };

  const setupAnimation = (
    animationData: IAnimationData
  ) => {
    setDataSeries((prev) => ({
      ...prev,
      ...animationData,
    }));
    togglePlayback();
  };

  const animateBubbleSort = () => {
    const { animationData } = bubbleSort(bars);
    setupAnimation(animationData);
  };

  const animateInsertionSort = () => {
    const { animationData } = insertionSort(bars);
    setupAnimation(animationData);
  };

  const animateSelectionSort = () => {
    const { animationData } = selectionSort(bars);
    setupAnimation(animationData);
  };

  const animateMergeSort = () => {
    const { animationData } = mergeSort(bars);
    setupAnimation(animationData);
  };

  const animateQuickSort = () => {
    const { animationData } = quickSort(bars);
    setupAnimation(animationData);
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
        animationState={animationState}
        animationFrames={dataSeries.atFrame.length}
        changeCurrentFrame={changeCurrentFrame}
      />
      <BarContainer bars={bars} barWidth={barWidth} />
    </div>
  );
};

export default SortingVisualizer;
