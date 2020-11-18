import React from "react";
import { useState, useEffect, useRef } from "react";
import Form from "../../Forms/Form";

import "./PointDetails.css";

const PointDetails = React.memo((props) => {
  const [show, setShow] = useState(props.fadeOutDetails);
  const [transform, setTransform] = useState();
  const [expandStyle, setExpandStyle] = useState(null);
  const [point, setPoint] = useState(props.point);

  console.log("pointdetails");

  useEffect(() => {
    if (!props.fadeOutDetails) setShow(false);
    if (props.fadeOutDetails) setShow(true);
  }, [props, props.fadeOutDetails]);

  let styleObj = useRef();
  let transformX;
  let transformY;

  styleObj.current = {
    animation: `${show ? "fadein 1s" : "fadeout 1s"}`,
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "50px",
    height: "100px",
    zIndex: 1,
    transform: transform,
  };

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

  const setPointDetails = (details) => {
    let updatedPoint = { ...props.point };
    updatedPoint.pointDetails = details;
    setPoint(updatedPoint);
    props.updatePointDetails(updatedPoint, props.index);
  };

  const contentStyleObj = {
    fontSize: ".5rem",
    lineHeight: ".8rem",
    width: "90%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "auto",
  };

  return (
    <div
      className={"point_details_main"}
      style={expandStyle ? expandStyle : styleObj.current}
      onClick={() => {
        if (!props.lockView) {
          setExpandStyle({
            width: "30%",
            height: "80%",
            position: "absolute",
            top: "10%",
            right: "10%",
            backgroundColor: "white",
            zIndex: 2,
            animation: `${!props.lockView ? null : "fadeout .5s"}`,
          });
          props.setLockView(true);
        }
      }}
      onMouseEnter={() => {
        setTransform(
          `scale(3) translateZ(0) translate(${transformX}, ${transformY})`
        );
      }}
      onMouseLeave={() => {}}
      onAnimationEnd={() => {
        if (props.openPointDetails && !show) props.setOpenPointDetails(false);
      }}
    >
      {props.lockView ? (
        <button
          onClick={() => {
            props.setLockView(false);
            setExpandStyle(null);
          }}
        >
          X
        </button>
      ) : null}
      {!point.pointDetails ? (
        <div className={"point_details_content"} style={contentStyleObj}>
          <Form setPointDetails={setPointDetails} />
        </div>
      ) : (
        <div className={"point_details_content"} style={contentStyleObj}>
          <h3>{point.pointDetails?.title}</h3>
          <h4>{point.pointDetails?.date}</h4>
          {point.pointDetails.imagePath ? (
            <img
              src={point.pointDetails?.imagePath}
              alt={"point details"}
              className="point_details_image"
            />
          ) : null}
          <p>{point.pointDetails?.description}</p>
        </div>
      )}
    </div>
  );
});

export default PointDetails;
