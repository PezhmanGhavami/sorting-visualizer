import {
  FC,
  useState,
  FormEventHandler,
  ChangeEventHandler,
} from "react";

import "./nav.styles.css";

interface INavProps {
  resetTheArray: () => void;
  changeAnimationSpeed: (value: number) => void;
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

  const handleInputchange: ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    props.changeAnimationSpeed(
      parseInt(event.currentTarget.value)
    );
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
        <button type="button" onClick={props.resetTheArray}>
          Generate New Array
        </button>
        <label htmlFor="animation-speed">
          Frame Time:{" "}
        </label>
        <input
          type="number"
          name="animationSpeed"
          id="animation-speed"
          min={1}
          max={100}
          defaultValue={1}
          step={1}
          onChange={handleInputchange}
        />
        <div>
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
        <button type="submit">Sort</button>
      </form>
    </div>
  );
};

export default Nav;
