import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Point from "../Point/Point";

import "./Main.css";

export default function Main() {
  const [points, setPoints] = useState([]);
  const [canvasUpdated, setCanvasUpdated] = useState(false);
  const [canvasX, setCanvasX] = useState();
  const [canvasY, setCanvasY] = useState();
  // const [previousPathLength, setPreviousPathLength] = useState();
  // const [pathUpdated, setPathUpdated] = useState(false);

  const canvasMain = useRef(null);

  useEffect(() => {
    const setContainerDimensions = () => {
      const container = ReactDOM.findDOMNode(
        canvasMain.current
      ).getBoundingClientRect();
      setCanvasX(container.width);
      setCanvasY(container.height);
    };

    window.addEventListener("resize", setContainerDimensions);
    if (!canvasX && !canvasY) setContainerDimensions();
  }, [canvasX, canvasY]);

  // useEffect(() => {
  //   if (document.getElementById("main_path") && pathUpdated) {
  //     setPreviousPathLength(
  //       document.getElementById("main_path")
  //     ).getTotalLength();
  //     setPathUpdated(false);
  //   }
  // }, [pathUpdated]);

  const addPoint = (e) => {
    let newPoints = [...points];
    const area = document.getElementById("main_canvas").getBoundingClientRect();
    const relativeY = e.clientY / area.height;
    const relativeX = (e.clientX - area.left) / area.width;

    console.log(relativeX, relativeY);

    newPoints.push({
      relativeX,
      relativeY,
    });
    setPoints(newPoints);
    setCanvasUpdated(!canvasUpdated);
  };

  const renderPaths = () => {
    let previousPathLength = 0;
    if (document.getElementById("main_path"))
      previousPathLength = document
        .getElementById("main_path")
        .getTotalLength();
    console.log(previousPathLength);
    if (points.length > 1) {
      let x1 = points[0].relativeX * canvasX;
      let y1 = points[0].relativeY * canvasY;
      let svgCurve = `M ${x1} ${y1} `;
      let x2 = points[1].relativeX * canvasX;
      let y2 = points[1].relativeY * canvasY;
      let cx1 = (x1 + x2) * 0.25;
      let cy1 = (y1 + y2) * 0.25;
      let cx2 = (x1 + x2) * 0.75;
      let cy2 = (y1 + y2) * 0.75;
      svgCurve = svgCurve + `C ${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`;

      if (points.length > 2) {
        for (let i = 2; i < points.length; i++) {
          let x = points[i].relativeX * canvasX;
          let y = points[i].relativeY * canvasY;
          svgCurve = svgCurve + `T ${x} ${y}`;
        }
      }
      return (
        <path d={svgCurve} stroke="black" fill="transparent" id={"main_path"} />
      );
    } else return null;
  };

  const renderPoints = () => {
    return points.map((point, index) => {
      return (
        <Point
          canvasX={canvasX}
          canvasY={canvasY}
          relativeX={point.relativeX}
          relativeY={point.relativeY}
          key={index}
        />
      );
    });
  };

  return (
    <div className={"main_main"}>
      <svg
        ref={canvasMain}
        id={"main_canvas"}
        onClick={(e) => {
          addPoint(e);
        }}
        style={{ height: "100%", width: "100%" }}
      >
        {renderPaths()}
      </svg>
      {renderPoints()}
    </div>
  );
}
