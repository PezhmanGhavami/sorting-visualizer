import "./bar.styles.css";

type TBarProps = {
  height: number;
  width: number;
  backgroundColor: string;
};

const Bar = (props: TBarProps) => {
  return (
    <div
      className="bar"
      title={props.height.toString()}
      style={{
        backgroundColor: props.backgroundColor,
        height: `${props.height}px`,
        width: `${props.width}px`,
      }}
    ></div>
  );
};

export default Bar;
