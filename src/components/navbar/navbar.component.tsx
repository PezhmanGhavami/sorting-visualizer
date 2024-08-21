//TODO - light/dark mode

import { useState, MouseEvent, ChangeEventHandler } from "react";

import { TAnimationState } from "../sorting-visualizer/sorting-visualizer.utils";

import "./navbar.styles.css";

import Cog from "../../assets/svgs/cog.svg?react";
import Play from "../../assets/svgs/play.svg?react";
import Pause from "../../assets/svgs/pause.svg?react";

type TBarInfo = {
  barCount: number;
  maxBarsForWidth: number;
};
type TNavProps = {
  barInfo: TBarInfo;
  animationFrames: number;
  animationState: TAnimationState;
  resetTheArray: () => void;
  bubbleSort: () => void;
  insertionSort: () => void;
  selectionSort: () => void;
  mergeSort: () => void;
  quickSort: () => void;
  togglePlayback: () => void;
  changeAnimationSpeed: (value: number) => void;
  changeBarCount: (value: number) => void;
  changeCurrentFrame: (value: number) => void;
};

const SortTypes = {
  bubbleSort: "Bubble Sort",
  insertionSort: "Insertion Sort",
  selectionSort: "Selection Sort",
  mergeSort: "Merge Sort",
  quickSort: "Quick Sort",
} as const;

type TSortTypes = keyof typeof SortTypes;

const InputChangeTypes = {
  BAR_COUNT: "barCount",
  ANIMATION_SPEED: "animationSpeed",
  TIMELINE: "timeline",
  SORT_TYPE: "sortType",
};

const Navbar = (props: TNavProps) => {
  const [sortType, setSortType] = useState<TSortTypes>("bubbleSort");
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const changeAction = event.currentTarget.name;
    const value = event.currentTarget.value;
    switch (changeAction) {
      case InputChangeTypes.BAR_COUNT: {
        props.changeBarCount(parseInt(value) || 2);
        break;
      }
      case InputChangeTypes.ANIMATION_SPEED: {
        props.changeAnimationSpeed(parseInt(value) || 1);
        break;
      }
      case InputChangeTypes.TIMELINE: {
        props.changeCurrentFrame(parseInt(value) || 0);
        break;
      }
      case InputChangeTypes.SORT_TYPE: {
        setSortType(value as TSortTypes);
        props.resetTheArray();
        break;
      }
    }
  };

  const handleFlow = () => {
    if (props.animationFrames) {
      return props.togglePlayback();
    }
    props[sortType]();
  };

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <nav className="navbar">
      {openModal && (
        <div onClick={toggleModal} className="modal-overlay">
          <div onClick={stopPropagation} className="modal-container">
            <span
              title="Close Settings"
              onClick={toggleModal}
              className="close"
            >
              &times;
            </span>
            <div className="nav-settings">
              <div className="nav-settings-item">
                <button
                  className="button"
                  type="button"
                  title="Click to generate a new array"
                  onClick={props.resetTheArray}
                  disabled={props.animationState.playback}
                >
                  Generate New Array
                </button>
              </div>

              <div className="nav-settings-item">
                <label htmlFor="bar-count">Bar Count: </label>
                <span>
                  {props.barInfo.barCount} Bars{" "}
                  <span
                    className="info"
                    tabIndex={0}
                    data-info={`${
                      props.animationState.playback
                        ? "⚠️To change the bar count you need to first stop the animation⚠️"
                        : "The bigger the width of your screen, the more bars you can fit in it. (Try landscape mode)"
                    }`}
                  >
                    ⓘ
                  </span>
                </span>
                <input
                  type="range"
                  name={InputChangeTypes.BAR_COUNT}
                  id="bar-count"
                  min={2}
                  max={props.barInfo.maxBarsForWidth}
                  step={1}
                  value={props.barInfo.barCount}
                  onChange={handleChange}
                  disabled={props.animationState.playback}
                />
              </div>

              <div className="nav-settings-item">
                <label htmlFor="animation-speed">Frame Delay: </label>
                <span>
                  {props.animationState.frameDelay}ms
                  <span
                    className="info"
                    tabIndex={0}
                    data-info="Lower is faster"
                  >
                    {" "}
                    ⓘ
                  </span>
                </span>
                <input
                  type="range"
                  name={InputChangeTypes.ANIMATION_SPEED}
                  id="animation-speed"
                  min={props.animationState.minFrameDelay}
                  max={props.animationState.maxFrameDelay}
                  step={1}
                  value={props.animationState.frameDelay}
                  onChange={handleChange}
                />
              </div>

              <div className="nav-settings-item">
                <label htmlFor="sort-type">Sort Algorithm: </label>
                <select
                  id="sort-type"
                  name={InputChangeTypes.SORT_TYPE}
                  value={sortType}
                  onChange={handleChange}
                  disabled={props.animationState.playback}
                >
                  {Object.keys(SortTypes).map((item) => (
                    <option key={item} value={item}>
                      {SortTypes[item as TSortTypes]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="nav-controllers">
        <button className="sort-settings" title="Settings">
          <Cog onClick={toggleModal} className="svg-component" />
        </button>

        <input
          type="range"
          name={InputChangeTypes.TIMELINE}
          id="sort-timeline"
          title={
            !props.animationFrames
              ? ""
              : `${props.animationState.currentFrame} / ${
                  props.animationFrames - 1
                }`
          }
          value={props.animationState.currentFrame}
          max={props.animationFrames - 1}
          onChange={handleChange}
          disabled={!props.animationFrames}
        />

        <button
          className="flow-control"
          type="button"
          onClick={handleFlow}
          title={props.animationState.playback ? "Pause" : "Play"}
        >
          {props.animationState.playback ? (
            <Pause className="svg-component" />
          ) : (
            <Play className="svg-component" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
