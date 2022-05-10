import { FC } from "react";

import "./bar.styles.css";

interface IBarProps {
  height: number;
  width: number;
}

enum BarColor {
  PRIMARY_COLOR = "turquoise",
  SECONDARY_COLOR = "red",
}

const Bar: FC<IBarProps> = (props) => {
  return (
    <div
      className="array-bar"
      style={{
        backgroundColor: BarColor.PRIMARY_COLOR,
        height: `${props.height}px`,
        width: `${props.width}px`,
      }}
    ></div>
  );
};

export default Bar;
