import {
  FC,
  useState,
  MouseEvent,
  FormEventHandler,
  ChangeEventHandler,
} from "react";

import { IAnimationState } from "../sorting-visualizer/sorting-visualizer.utils";

import "./navbar.styles.css";

import { ReactComponent as Play } from "../../assets/svgs/play.svg";
import { ReactComponent as Pause } from "../../assets/svgs/pause.svg";
import { ReactComponent as Cog } from "../../assets/svgs/cog.svg";

interface IBarInfo {
  barCount: number;
  maxBarsForWidth: number;
}
interface INavProps {
  barInfo: IBarInfo;
  animationFrames: number;
  animationState: IAnimationState;
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
}

enum SortTypes {
  BUBBLE = "BUBBLE",
  INSERTION = "INSERTION",
  SELECTION = "SELECTION",
  MERGE = "MERGE",
  QUICK = "QUICK",
}

enum InputChangeTypes {
  BAR_COUNT = "barCount",
  ANIMATION_SPEED = "animationSpeed",
  TIMELINE = "timeline",
}

type SortTypesKey = keyof typeof SortTypes;

const Nav: FC<INavProps> = (props) => {
  const [sortType, setSortType] = useState(
    SortTypes.BUBBLE
  );
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement
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
      }
    }
  };

  const handleSelectChange: ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    setSortType(
      SortTypes[event.currentTarget.value as SortTypesKey]
    );
    props.resetTheArray();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    if (props.animationFrames) {
      return props.togglePlayback();
    }
    switch (sortType) {
      case SortTypes.BUBBLE:
        props.bubbleSort();
        break;
      case SortTypes.INSERTION:
        props.insertionSort();
        break;
      case SortTypes.SELECTION:
        props.selectionSort();
        break;
      case SortTypes.MERGE:
        props.mergeSort();
        break;
      case SortTypes.QUICK:
        props.quickSort();
        break;
    }
  };

  const stopPropagation = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  //TODO - corret the namings

  return (
    <>
      {openModal && (
        <div
          onClick={toggleModal}
          className="modal-overlay"
        >
          <div
            onClick={stopPropagation}
            className="modal-container"
          >
            <span onClick={toggleModal} className="close">
              &times;
            </span>
            <div className="nav-settings">
              <div className="nav__form__item">
                <button
                  className=" button"
                  type="button"
                  onClick={props.resetTheArray}
                >
                  Generate New Array
                </button>
              </div>

              <div className="nav__form__item">
                <label htmlFor="bar-count">
                  Bar Count:{" "}
                </label>
                <span>{props.barInfo.barCount} Bars</span>
                <input
                  type="range"
                  name={InputChangeTypes.BAR_COUNT}
                  id="bar-count"
                  min={2}
                  max={props.barInfo.maxBarsForWidth}
                  step={1}
                  value={props.barInfo.barCount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="nav__form__item">
                <label htmlFor="animation-speed">
                  Frame Delay:{" "}
                </label>
                <span>
                  {props.animationState.frameDelay}ms
                </span>
                <input
                  type="range"
                  name={InputChangeTypes.ANIMATION_SPEED}
                  id="animation-speed"
                  min={props.animationState.minFrameDelay}
                  max={props.animationState.maxFrameDelay}
                  step={1}
                  value={props.animationState.frameDelay}
                  onChange={handleInputChange}
                />
              </div>

              <div className="nav__form__item">
                <label htmlFor="sort-type">
                  Sort Algorithm:{" "}
                </label>
                <select
                  id="sort-type"
                  name="sortType"
                  value={sortType}
                  onChange={handleSelectChange}
                >
                  <option value={SortTypes.BUBBLE}>
                    Bubble Sort
                  </option>
                  <option value={SortTypes.INSERTION}>
                    Insertion Sort
                  </option>
                  <option value={SortTypes.SELECTION}>
                    Selection Sort
                  </option>
                  <option value={SortTypes.MERGE}>
                    Merge Sort
                  </option>
                  <option value={SortTypes.QUICK}>
                    Quick Sort
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="nav">
        <form className="nav__form" onSubmit={handleSubmit}>
          <div className="nav-controllers">
            <Cog
              onClick={toggleModal}
              className="svg-component"
            />

            <input
              type="range"
              name={InputChangeTypes.TIMELINE}
              id="sort-timeline"
              value={props.animationState.currentFrame}
              max={props.animationFrames - 1}
              onChange={handleInputChange}
              disabled={!Boolean(props.animationFrames)}
            />
            <button className="play-pause" type="submit">
              {props.animationState.playback ? (
                <Pause className="svg-component" />
              ) : (
                <Play className="svg-component" />
              )}
            </button>
          </div>
        </form>
      </nav>
    </>
  );
};

export default Nav;
