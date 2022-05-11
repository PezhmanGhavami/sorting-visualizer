import { FC } from "react";

import "./nav.styles.css";

interface INavProps {
  resetTheArray: () => void;
  bubbleSort: () => void;
}

const Nav: FC<INavProps> = (props) => {
  return (
    <div className="nav">
      <button onClick={props.resetTheArray}>
        Generate New Array
      </button>
      <button>Merge Sort</button>
      <button>Quick Sort</button>
      <button>Heap Sort</button>
      <button onClick={props.bubbleSort}>
        Bubble Sort
      </button>
    </div>
  );
};

export default Nav;
