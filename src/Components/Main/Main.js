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
    // const previousLength = document
    //   .getElementById("main_path")
    //   .getTotalLength();

    let newPoints = [...points];
    const area = document.getElementById("main_canvas").getBoundingClientRect();
    const relativeY = e.clientY / area.height;
    const relativeX = (e.clientX - area.left) / area.width;

    newPoints.push({
      relativeX,
      relativeY,
    });
    setPoints(newPoints);
    setCanvasUpdated(!canvasUpdated);
    // drawLine(previousLength);
  };

  const drawLine = (previousLength) => {
    console.log(previousLength);
    console.log(document.getElementById("main_path").getTotalLength());
  };

  const renderPaths = () => {
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
          let cx = (points[i - 1].relativeX * canvasX + x) * 0.5;
          let cy = (points[i - 1].relativeY * canvasY + y) * 0.5;
          svgCurve = svgCurve + `S ${cx} ${cy} ${x} ${y}`;
        }
      }
      return (
        <path
          d={svgCurve}
          markerEnd={"X"}
          stroke="black"
          fill="transparent"
          id={"main_path"}
          strokeWidth={"2"}
        />
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

  const showPath = () => {
    if (document.getElementById("main_path")) {
      const path = document.getElementById("main_path");
      const length = path.getTotalLength();
      console.log(path.style.strokeDasharray);
      console.log(path.style.strokeDashoffset);
      path.style.transition = path.style.WebkitTransition = "none";
      path.style.strokeDasharray = length + " " + length;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect();
      path.style.transition = path.style.WebkitTransition =
        "stroke-dashoffset 5s ease-in-out";
      path.style.strokeDashoffset = "0";
      setTimeout(() => {
        path.style.transition = path.style.WebkitTransition = "none";
        path.style.strokeDasharray = null;
        path.style.strokeDashoffset = null;
      }, 5000);
    }
  };

  return (
    <div className={"main_main"}>
      <div className={"main_utilities"}>
        <button
          onClick={() => {
            showPath();
            // setTimeout(() => {
            //   const path = document.getElementById("main_path");
            //   path.style.transition = path.style.WebkitTransition = "none";
            // }, [5000]);
          }}
        >
          Show Path
        </button>
      </div>
      <svg
        ref={canvasMain}
        id={"main_canvas"}
        onClick={(e) => {
          addPoint(e);
        }}
      >
        {renderPaths()}
      </svg>
      {renderPoints()}
    </div>
  );
}
