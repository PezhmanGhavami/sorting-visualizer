import {
  FC,
  useState,
  FormEventHandler,
  ChangeEventHandler,
} from "react";

import "./nav.styles.css";

interface IBarInfo {
  barCount: number;
  maxBarsForWidth: number;
}
interface INavProps {
  resetTheArray: () => void;
  changeAnimationSpeed: (value: number) => void;
  changeBarCount: (value: number) => void;
  barInfo: IBarInfo;
  animationSpeed: number;
  playAnimation: boolean;
  animationFrames: number;
  currentFrame: number;
  bubbleSort: () => void;
  insertionSort: () => void;
  selectionSort: () => void;
  mergeSort: () => void;
  quickSort: () => void;
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

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const changeAction = event.currentTarget.name;
    switch (changeAction) {
      case InputChangeTypes.BAR_COUNT: {
        props.changeBarCount(
          parseInt(event.currentTarget.value) || 2
        );
        break;
      }
      case InputChangeTypes.ANIMATION_SPEED: {
        props.changeAnimationSpeed(
          parseInt(event.currentTarget.value) || 1
        );
        break;
      }
      case InputChangeTypes.TIMELINE: {
        //TODO - add a setter for the currentFrame value
      }
    }
  };

  const handleSelectChange: ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    console.log(event.currentTarget.value);
    setSortType(
      SortTypes[event.currentTarget.value as SortTypesKey]
    );
    props.resetTheArray();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
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
  return (
    <div className="nav">
      <form className="nav__form" onSubmit={handleSubmit}>
        <div className="nav-settings">
          <button
            className="nav__form__item"
            type="button"
            onClick={props.resetTheArray}
          >
            Generate New Array
          </button>
          <div className="nav__form__item">
            <label htmlFor="bar-count">Bar Count: </label>
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
            <input
              type="range"
              name={InputChangeTypes.ANIMATION_SPEED}
              id="animation-speed"
              min={1}
              max={500}
              step={1}
              value={props.animationSpeed}
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

        <div className="nav-controllers">
          <input
            // className="nav__form__item"
            type="range"
            name={InputChangeTypes.TIMELINE}
            id="sort-timeline"
            value={props.currentFrame}
            max={props.animationFrames}
            onChange={handleInputChange}
            disabled
          />
          <button className="nav__form__item" type="submit">
            {props.playAnimation ? "pause" : "play"}
          </button>
          <button
            className="nav__form__item"
            type="button"
            disabled={!props.playAnimation}
          >
            stop
          </button>
        </div>
      </form>
    </div>
  );
};

export default Nav;
