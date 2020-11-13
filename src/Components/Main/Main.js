import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDrop } from "react-dnd";
import Point from "../Point/Point";

import "./Main.css";
import { ItemTypes } from "../../Service/dndItemTypes";

export default function Main() {
  const [points, setPoints] = useState([]);
  const [canvasUpdated, setCanvasUpdated] = useState(false);
  const [canvasX, setCanvasX] = useState();
  const [canvasY, setCanvasY] = useState();
  const [movingPoint, setMovingPoint] = useState();

  const canvasMain = useRef(null);

  useEffect(() => {
    const setContainerDimensions = () => {
      setTimeout(() => {
        const container = ReactDOM.findDOMNode(
          canvasMain.current
        ).getBoundingClientRect();
        setCanvasX(container.width);
        setCanvasY(container.height);
      }, 500);
    };

    window.addEventListener("resize", setContainerDimensions);
    if (!canvasX && !canvasY) setContainerDimensions();
  }, [canvasX, canvasY]);

  const addPoint = (e) => {
    let newPoints = [...points];
    const area = document.getElementById("main_canvas").getBoundingClientRect();
    const relativeY = e.clientY / area.height;
    const relativeX = e.clientX / area.width;

    newPoints.push({
      relativeX,
      relativeY,
    });
    setPoints(newPoints);
    setCanvasUpdated(!canvasUpdated);
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
          index={index}
          key={index}
          setMovingPoint={setMovingPoint}
        />
      );
    });
  };

  const showPath = () => {
    if (document.getElementById("main_path")) {
      let time = (points.length / (points.length + 5)) * 10;

      const path = document.getElementById("main_path");
      const length = path.getTotalLength();

      path.style.transition = path.style.WebkitTransition = "none";
      path.style.strokeDasharray = length + " " + length;
      path.style.strokeDashoffset = length;
      path.getBoundingClientRect();
      path.style.transition = path.style.WebkitTransition = `stroke-dashoffset ${time}s ease-in-out`;
      path.style.strokeDashoffset = "0";
      setTimeout(() => {
        path.style.transition = path.style.WebkitTransition = "none";
        path.style.strokeDasharray = null;
        path.style.strokeDashoffset = null;
      }, time * 1000);
    }
  };

  const [, drop] = useDrop({
    accept: ItemTypes.POINT,
    drop: (item, monitor) => {
      updatePointPosition(monitor.getDifferenceFromInitialOffset());
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const updatePointPosition = (difference) => {
    let newPoints = [...points];
    const area = document.getElementById("main_canvas").getBoundingClientRect();
    let initialX = points[movingPoint].relativeX * area.width;
    let initialY = points[movingPoint].relativeY * area.height;
    let x = initialX + difference.x;
    let y = initialY + difference.y;
    const relativeY = y / area.height;
    const relativeX = x / area.width;

    newPoints[movingPoint].relativeX = relativeX;
    newPoints[movingPoint].relativeY = relativeY;

    setPoints(newPoints);
    setCanvasUpdated(!canvasUpdated);
  };

  return (
    <div className={"main_main"} ref={drop}>
      <div className={"main_utilities"}>
        <button onClick={() => showPath()}>Show Path</button>
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
