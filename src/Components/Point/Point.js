import "./Point.css";

export default function Point(props) {
  let styleObj = {
    position: "absolute",
    top: props.canvasY * props.relativeY,
    left: props.canvasX * props.relativeX,
    width: "20px",
    height: "20px",
    marginTop: "-10px",
    marginLeft: "-10px",
  };

  const handleDrag = () => {
    setTimeout(() => {
      console.log("dragging");
    }, 1000);
  };

  return (
    <button
      onMouseDown={() => {
        handleDrag();
      }}
      // onMou
      // onTouchStart={() => {
      //   setTimeout(() => {
      //     console.log("dragging");
      //   }, 2000);
      // }}
      className={"point_main"}
      style={styleObj}
    />
  );
}
