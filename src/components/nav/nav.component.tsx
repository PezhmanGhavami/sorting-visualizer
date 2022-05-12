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
  bubbleSort: () => void;
  insertionSort: () => void;
  selectionSort: () => void;
  mergeSort: () => void;
  quickSort: () => void;
}

enum SortTypes {
  bubble = "bubble",
  insertion = "insertion",
  selection = "selection",
  merge = "merge",
  quick = "quick",
}

type SortTypesKey = keyof typeof SortTypes;

const Nav: FC<INavProps> = (props) => {
  const [sortType, setSortType] = useState(
    SortTypes.bubble
  );

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    if (event.currentTarget.name === "barCount") {
      props.changeBarCount(
        parseInt(event.currentTarget.value)
      );
    } else if (
      event.currentTarget.name === "animationSpeed"
    ) {
      props.changeAnimationSpeed(
        parseInt(event.currentTarget.value)
      );
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
    switch (sortType) {
      case SortTypes.bubble:
        props.bubbleSort();
        break;
      case SortTypes.insertion:
        props.insertionSort();
        break;
      case SortTypes.selection:
        props.selectionSort();
        break;
      case SortTypes.merge:
        props.mergeSort();
        break;
      case SortTypes.quick:
        props.quickSort();
        break;
    }
  };
  return (
    <div className="nav">
      <form className="nav__form" onSubmit={handleSubmit}>
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
            name="barCount"
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
            Frame Time:{" "}
          </label>
          <input
            type="number"
            name="animationSpeed"
            id="animation-speed"
            min={1}
            max={100}
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
            <option value={SortTypes.bubble}>
              Bubble Sort
            </option>
            <option value={SortTypes.insertion}>
              Insertion Sort
            </option>
            <option value={SortTypes.selection}>
              Selection Sort
            </option>
            <option value={SortTypes.merge}>
              Merge Sort
            </option>
            <option value={SortTypes.quick}>
              Quick Sort
            </option>
          </select>
        </div>
        <button className="nav__form__item" type="submit">
          Sort
        </button>
      </form>
    </div>
  );
};

export default Nav;
