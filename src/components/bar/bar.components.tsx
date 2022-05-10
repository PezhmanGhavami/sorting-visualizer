import { FC } from "react";

import "./bar.styles.css";

interface IBarProps {
  height: number;
  width: number;
}

const PRIMARY_COLOR = "turquoise";
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const Bar: FC<IBarProps> = (props) => {
  return (
    <div
      className="array-bar"
      style={{
        backgroundColor: PRIMARY_COLOR,
        height: `${props.height}px`,
        width: `${props.width}px`,
      }}
    ></div>
  );
};

export default Bar;
