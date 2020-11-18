import { useEffect, useState } from "react";

import { Transition } from "react-transition-group";

const DetailsPreview = (props) => {
  const [point, setPoint] = useState();
  const [relativeX, setRelativeX] = useState();
  const [relativeY, setRelativeY] = useState();
  const [styleObj, setStyleObj] = useState({
    transition: `all 500ms`,
    transformOrigin: "top",
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "10vw",
    height: "20vw",
    zIndex: 1,
    border: "1px solid black",
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    console.log("movingpoint");
    if (!point && props.point) setPoint(props.point);
    if (point !== props.point && props.point) setPoint(props.point);

    if (relativeX !== point?.relativeX && relativeY !== point?.relativeY) {
      console.log("settingrelatives");
      setRelativeX(point.relativeX);
      setRelativeY(point.relativeY);
    }

    let newStyleObj;
    if (relativeX && relativeY) {
      if (relativeX <= 0.5 && relativeY <= 0.5) console.log("here");
      newStyleObj = {
        ...styleObj,
        top: relativeY * props.canvasY,
        left: relativeX * props.canvasX,
        bottom: null,
        right: null,
        transformOrigin: "top",
      };
      if (relativeX <= 0.5 && relativeY > 0.5)
        newStyleObj = {
          ...styleObj,
          bottom: props.canvasY - props.canvasY * relativeY,
          left: relativeX * props.canvasX,
          right: null,
          top: null,
          transformOrigin: "bottom",
        };
      if (relativeX > 0.5 && relativeY <= 0.5)
        newStyleObj = {
          ...styleObj,
          top: relativeY * props.canvasY,
          right: props.canvasX - props.canvasX * relativeX,
          bottom: null,
          left: null,
          transformOrigin: "top",
        };
      if (relativeX > 0.5 && relativeY > 0.5)
        newStyleObj = {
          ...styleObj,
          bottom: props.canvasY - props.canvasY * relativeY,
          right: props.canvasX - props.canvasX * relativeX,
          top: null,
          left: null,
          transformOrigin: "bottom",
        };
      if (
        newStyleObj.top !== styleObj.top ||
        newStyleObj.bottom !== styleObj.bottom
      )
        setStyleObj(newStyleObj);
    } else if (!props.openPointDetails) {
      console.log("resettingstyle");
      newStyleObj = { ...styleObj, bottom: 0, left: 0 };
    }
    if (
      newStyleObj.bottom === 0 &&
      newStyleObj.left === 0 &&
      styleObj.bottom !== 0 &&
      styleObj.left !== 0
    )
      setStyleObj(newStyleObj);
  }, [props, point, relativeX, relativeY, props.movingPoint, styleObj]);

  const transitionStyles = {
    entering: { opacity: 0, transform: "scale(1, 0)" },
    entered: { opacity: 1 },
    exiting: { opacity: 1, transform: "scale(1, 0)" },
    exited: { opacity: 0 },
  };

  return (
    <Transition
      in={props.in}
      timeout={{ appear: 100, enter: 500, exit: 500 }}
      appear
      unmountOnExit
    >
      {(state) => (
        <div
          onClick={() => {
            console.log("click");
            props.setOpenPointDetails(true);
            props.setLockView(true);
          }}
          id="details_preview_main"
          className={"details_preview_main"}
          style={{ ...styleObj, ...transitionStyles[state] }}
        ></div>
      )}
    </Transition>
  );
};

export default DetailsPreview;
//}
