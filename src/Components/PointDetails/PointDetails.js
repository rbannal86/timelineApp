import { useState, useEffect, useRef } from "react";

import "./PointDetails.css";

export default function PointDetails(props) {
  console.log("point details rendering");
  const [show, setShow] = useState(props.fadeOutDetails);
  const [transform, setTransform] = useState();

  useEffect(() => {
    if (!props.fadeOutDetails) setShow(false);
    if (props.fadeOutDetails) setShow(true);
  }, [props, props.fadeOutDetails]);

  let styleObj = useRef();
  let transformX;
  let transformY;

  styleObj.current = {
    animation: `${show ? "fadein" : "fadeout"} 1s `,
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "50px",
    height: "100px",
    zIndex: 1,
    transform: transform,
  };

  console.log(styleObj.current);

  if (!props.point) {
    styleObj.current = { display: "none" };
  } else if (props.point.relativeX < 0.5) {
    styleObj.current = {
      ...styleObj.current,
      left: props.point.relativeX * props.canvasX,
    };
    transformX = "30%";
  } else {
    styleObj.current = {
      ...styleObj.current,
      left: props.point.relativeX * props.canvasX - 50,
    };
    transformX = "-30%";
  }

  if (!props.point) styleObj.current = { display: "none" };
  else if (props.point.relativeY < 0.5) {
    transformY = "30%";
    styleObj.current = {
      ...styleObj.current,
      top: props.point.relativeY * props.canvasY,
    };
  } else {
    transformY = "-30%";
    styleObj.current = {
      ...styleObj.current,
      top: props.point.relativeY * props.canvasY - 100,
    };
  }

  return (
    <div
      className={"point_details_main"}
      style={styleObj.current}
      onClick={() => {
        console.log("click");
      }}
      onMouseEnter={() => {
        console.log("mouseenter");

        setTransform(`scale(3) translate(${transformX}, ${transformY})`);
      }}
      onMouseLeave={() => {}}
      onAnimationEnd={() => {
        if (props.openPointDetails && !show) props.setOpenPointDetails(false);
      }}
    ></div>
  );
}
