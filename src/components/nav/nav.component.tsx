import { FC } from "react";

import "./nav.styles.css";

interface INavProps {
  resetTheArray: () => void;
  bubbleSort: () => void;
  insertionSort: () => void;
}

const Nav: FC<INavProps> = (props) => {
  return (
    <div className="nav">
      <button onClick={props.resetTheArray}>
        Generate New Array
      </button>
      <button onClick={props.bubbleSort}>
        Bubble Sort
      </button>
      <button onClick={props.insertionSort}>
        Insertion Sort
      </button>
      <button>Heap Sort</button>
      <button>Merge Sort</button>
      <button>Quick Sort</button>
    </div>
  );
};

export default Nav;
