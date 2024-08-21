import Bar from "../bar/bar.components";
import { TBars } from "../sorting-visualizer/sorting-visualizer.utils";

import "./bar-container.styles.css";

type TBarContainer = {
  bars: TBars;
  barWidth: number;
};

const BarContainer = ({ bars, barWidth }: TBarContainer) => {
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
