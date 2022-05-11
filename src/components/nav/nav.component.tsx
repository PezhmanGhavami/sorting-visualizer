import {
  FC,
  useState,
  FormEventHandler,
  ChangeEventHandler,
} from "react";

import "./nav.styles.css";

interface INavProps {
  resetTheArray: () => void;
  bubbleSort: () => void;
  insertionSort: () => void;
  selectionSort: () => void;
  mergeSort: () => void;
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

  const handleChange: ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    setSortType(
      SortTypes[event.currentTarget.value as SortTypesKey]
    );
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
        props.bubbleSort();
        break;
    }
  };
  return (
    <div className="nav">
      <button onClick={props.resetTheArray}>
        Generate New Array
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sort-type">Sort Algorithm:</label>
        <select
          id="sort-type"
          name="sortType"
          value={sortType}
          onChange={handleChange}
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
        <button>Sort</button>
      </form>
    </div>
  );
};

export default Nav;
