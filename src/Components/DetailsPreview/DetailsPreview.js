import "./DetailsPreview.js";

export default function DetailsPreview(props) {
  let relativeX = props.point.relativeX;
  let relativeY = props.point.relativeY;

  let styleObj = {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "10vw",
    height: "20vw",
    zIndex: 1,
    // top: relativeY * props.canvasY,
    // left: relativeX * props.canvasX,
  };

  console.log((props.canvasY * 0.8) / props.canvasX);

  if (relativeX <= 0.5 && relativeY <= 0.5)
    styleObj = {
      ...styleObj,
      top: relativeY * props.canvasY,
      left: relativeX * props.canvasX,
    };
  if (relativeX <= 0.5 && relativeY > 0.5)
    styleObj = {
      ...styleObj,
      bottom: props.canvasY - props.canvasY * relativeY,
      left: relativeX * props.canvasX,
    };
  if (relativeX > 0.5 && relativeY <= 0.5)
    styleObj = {
      ...styleObj,
      top: relativeY * props.canvasY,
      right: props.canvasX - props.canvasX * relativeX,
    };
  if (relativeX > 0.5 && relativeY > 0.5)
    styleObj = {
      ...styleObj,
      bottom: props.canvasY - props.canvasY * relativeY,
      right: props.canvasX - props.canvasX * relativeX,
    };

  return (
    <div
      id="details_preview_main"
      className="details_preview_main"
      style={styleObj}
    ></div>
  );
}
