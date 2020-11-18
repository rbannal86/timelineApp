import React, { useState, useEffect, useCallback } from "react";
import { useDrop } from "react-dnd";
import Point from "../Point/Point";
import Utilities from "../Utilities/Utilities";
import PointDetails from "../PointDetails/PointDetails";
import Canvas from "../Canvas/Canvas";
import DetailsPreview from "../DetailsPreview/DetailsPreview";

import "./Main.css";
import { ItemTypes } from "../../Service/dndItemTypes";

export default function Main() {
  const [points, setPoints] = useState([]);
  const [canvasUpdated, setCanvasUpdated] = useState(false);
  const [canvasX, setCanvasX] = useState();
  const [canvasY, setCanvasY] = useState();
  const [movingPoint, setMovingPoint] = useState();
  const [screenLock, setScreenLock] = useState(false);
  const [previousMove, setPreviousMove] = useState();
  const [openPointDetails, setOpenPointDetails] = useState(false);
  const [fadeOutDetails, setFadeOutDetails] = useState(false);
  const [buttonFocus, setButtonFocus] = useState(false);
  const [windowUpdated, setWindowUpdated] = useState(false);
  const [lockView, setLockView] = useState(false);
  const [openDetailsPreview, setOpenDetailsPreview] = useState(false);

  //Functions for Utilities Buttons
  const showPath = useCallback(() => {
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
  }, [points.length]);

  const deleteLastPoint = () => {
    if (points.length > 0) {
      let updatedPoints = [...points];
      updatedPoints.pop();
      setPoints(updatedPoints);
      setCanvasUpdated(!canvasUpdated);
    }
  };

  const undoLastMove = () => {
    if (previousMove) {
      let updatedPoints = [...points];
      updatedPoints[previousMove.index].relativeX = previousMove.relativeX;
      updatedPoints[previousMove.index].relativeY = previousMove.relativeY;
      setPoints(updatedPoints);
      setPreviousMove(null);
    }
  };

  const [, drop] = useDrop({
    accept: ItemTypes.POINT,
    hover: () => {
      if (fadeOutDetails) setFadeOutDetails(false);
    },
    drop: (item, monitor) => {
      updatePointPosition(monitor.getDifferenceFromInitialOffset());
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const updatePointPosition = (difference, index = movingPoint) => {
    console.log(index);
    if (index !== null) {
      setPreviousMove({
        index: movingPoint,
        relativeX: points[index].relativeX,
        relativeY: points[index].relativeY,
      });
      let newPoints = [...points];
      const area = document
        .getElementById("canvas_main")
        .getBoundingClientRect();
      // const area = ReactDOM.findDOMNode(
      //   canvasMain.current
      // ).getBoundingClientRect();
      let initialX = points[index].relativeX * area.width;
      let initialY = points[index].relativeY * area.height;
      let x = initialX + difference.x;
      let y = initialY + difference.y;
      const relativeY = y / area.height;
      const relativeX = x / area.width;

      newPoints[movingPoint].relativeX = relativeX;
      newPoints[movingPoint].relativeY = relativeY;

      setPoints(newPoints);
      setCanvasUpdated(!canvasUpdated);
      setMovingPoint(null);
    }
  };

  useEffect(() => {
    const setContainerDimensions = () => {
      setWindowUpdated(true);
      setTimeout(() => {
        // if (ReactDOM.findDOMNode(canvasMain.current)) {
        if (document.getElementById("canvas_main")) {
          const container = document
            .getElementById("canvas_main")
            .getBoundingClientRect();
          // const container = ReactDOM.findDOMNode(
          //   canvasMain.current
          // ).getBoundingClientRect();
          setCanvasX(container.width);
          setCanvasY(container.height);
          setWindowUpdated(false);
          // showPath();
        }
      }, 20);
    };

    window.addEventListener("resize", setContainerDimensions);
    if (!canvasX && !canvasY) setContainerDimensions();
  }, [canvasX, canvasY, showPath]);

  const addPoint = (e) => {
    if (!screenLock && !lockView) {
      let newPoints = [...points];
      const area =
        // ReactDOM.findDOMNode(
        //   canvasMain.current
        // ).getBoundingClientRect();
        document.getElementById("canvas_main").getBoundingClientRect();
      const relativeY = e.clientY / area.height;
      const relativeX = e.clientX / area.width;
      newPoints.push({
        relativeX,
        relativeY,
      });
      setPoints(newPoints);
      setCanvasUpdated(!canvasUpdated);
    }
  };

  const renderPaths = () => {
    if (points.length > 1 && !windowUpdated) {
      let x1 = points[0].relativeX * canvasX;
      let y1 = points[0].relativeY * canvasY;
      let svgCurve = `M ${x1} ${y1} `;
      let x2 = points[1].relativeX * canvasX;
      let y2 = points[1].relativeY * canvasY;
      let cx1;
      let cx2;
      if (x1 > x2) {
        cx1 = (x1 + x2) * 0.4;
        cx2 = (x1 + x2) * 0.6;
      } else {
        cx2 = (x1 + x2) * 0.4;
        cx1 = (x1 + x2) * 0.6;
      }
      let cy1 = (y1 + y2) * 0.25;
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

  const updatePointDetails = (point, index) => {
    let updatedPoints = [...points];
    updatedPoints[index] = point;
    setPoints(updatedPoints);
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
          setOpenPointDetails={setOpenPointDetails}
          setFadeOutDetails={setFadeOutDetails}
          fadeOutDetails={fadeOutDetails}
          movingPoint={movingPoint}
          setButtonFocus={setButtonFocus}
          buttonFocus={buttonFocus}
          setOpenDetailsPreview={setOpenDetailsPreview}
          openDetailsPreview={openDetailsPreview}
        />
      );
    });
  };

  return (
    <div className={"main_main"} ref={drop}>
      <Utilities
        showPath={showPath}
        deleteLastPoint={deleteLastPoint}
        setScreenLock={setScreenLock}
        screenLock={screenLock}
        undoLastMove={undoLastMove}
      />
      {openPointDetails ? (
        <PointDetails
          point={points[movingPoint]}
          canvasX={canvasX}
          canvasY={canvasY}
          setFadeOutDetails={setFadeOutDetails}
          updatePointDetails={updatePointDetails}
          index={movingPoint}
          setLockView={setLockView}
          setOpenPointDetails={setOpenPointDetails}
        />
      ) : null}
      <Canvas
        addPoint={addPoint}
        openDetailsPreview={openDetailsPreview}
        windowUpdated={windowUpdated}
        renderPaths={renderPaths}
        setButtonFocus={setButtonFocus}
      />
      <DetailsPreview
        point={points[movingPoint]}
        movingPoint={movingPoint}
        canvasX={canvasX}
        canvasY={canvasY}
        in={openDetailsPreview}
        setLockView={setLockView}
        setOpenPointDetails={setOpenPointDetails}
        openPointDetails={openPointDetails}
        lockView={lockView}
      />
      {renderPoints()}
    </div>
  );
}
