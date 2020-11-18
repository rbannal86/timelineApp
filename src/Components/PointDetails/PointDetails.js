import { useState } from "react";

import "./PointDetails.css";
import Form from "../../Forms/Form";

export default function PointDetails(props) {
  const [point, setPoint] = useState(props.point);

  let styleObj = {
    width: "30%",
    height: "80%",
    position: "absolute",
    top: "10%",
    right: "10%",
    backgroundColor: "white",
    zIndex: 3,
    border: "2px solid black",
    animation: "fadein 1s",
  };

  const setPointDetails = (details) => {
    let updatedPoint = { ...props.point };
    updatedPoint.pointDetails = details;
    setPoint(updatedPoint);
    props.updatePointDetails(updatedPoint, props.index);
  };

  return (
    <div style={styleObj}>
      <h2>POINT DETAILS</h2>
      <button
        onClick={() => {
          props.setLockView(false);
          props.setOpenPointDetails(false);
        }}
      >
        X
      </button>
      {!point.pointDetails ? (
        <Form setPointDetails={setPointDetails} />
      ) : (
        <div className={"point_details_content"}>
          {point.pointDetails.title ? (
            <h3>{point.pointDetails.title}</h3>
          ) : null}
          {point.pointDetails.date ? (
            <div>{point.pointDetails.date}</div>
          ) : null}
          {point.pointDetails.imagePath ? (
            <img
              src={point.pointDetails.imagePath}
              alt="description"
              className={"point_details_image"}
            />
          ) : null}
          {point.pointDetails.description ? (
            <div className={"point_details_description"}>
              {point.pointDetails.description}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
