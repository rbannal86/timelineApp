import { useState, useEffect } from "react";

import "./PointDetails.css";

export default function PointDetails(props) {
  const [show, setShow] = useState(props.fadeOutDetails);

  console.log(props.fadeOutDetails);

  useEffect(() => {
    console.log(props.fadeOutDetails);
    if (!props.fadeOutDetails) setShow(false);
    if (props.fadeOutDetails) setShow(true);
  }, [props, props.fadeOutDetails]);

  let styleObj = {
    animation: `${show ? "fadein" : "fadeout"} 2s `,
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "50px",
    height: "100px",
  };

  console.log(styleObj.animation);

  if (!props.point) {
    styleObj = { display: "none" };
  } else if (props.point.relativeX < 0.5) {
    styleObj = { ...styleObj, left: props.point.relativeX * props.canvasX };
  } else
    styleObj = {
      ...styleObj,
      left: props.point.relativeX * props.canvasX - 50,
    };
  if (!props.point) styleObj = { display: "none" };
  else if (props.point.relativeY < 0.5) {
    styleObj = { ...styleObj, top: props.point.relativeY * props.canvasY };
  } else
    styleObj = {
      ...styleObj,
      top: props.point.relativeY * props.canvasY - 100,
    };

  return (
    <div
      className={"point_details_main"}
      style={styleObj}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onAnimationEnd={() => {
        if (props.openPointDetails && !show) props.setOpenPointDetails(false);
      }}
    ></div>
  );
}
