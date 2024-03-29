import Bar from "../bar/bar.components";
import { IBars } from "../sorting-visualizer/sorting-visualizer.utils";

import "./bar-container.styles.css";

interface IBarContainer {
  bars: IBars;
  barWidth: number;
}

const BarContainer = ({
  bars,
  barWidth,
}: IBarContainer) => {
  return (
    <div className="bar-container">
      {bars.heights.map((value, index) => (
        <Bar
          key={index}
          height={value}
          width={barWidth}
          backgroundColor={bars.colors[index]}
        />
      ))}
    </div>
  );
};

export default BarContainer;
