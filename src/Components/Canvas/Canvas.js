import React, { useState, useEffect } from "react";

import "./Canvas.css";

const Canvas = (props) => {
  const [windowUpdated, setWindowUpdated] = useState(props.windowUpdated);
  const [fadeoutClass, setFadeoutClass] = useState(null);

  console.log(props.openSlideShow);

  useEffect(() => {
    if (fadeoutClass === null && props.openSlideShow !== false) {
      console.log("setting animation");
      setFadeoutClass("canvas_fadeout");
    }
  }, [fadeoutClass, props.openSlideShow]);

  useEffect(() => {
    if (props.windowUpdated !== windowUpdated) {
      setWindowUpdated(props.windowUpdated);
    }
  }, [props.windowUpdated, windowUpdated]);

  return (
    <svg
      className={"canvas_main " + fadeoutClass}
      id={"canvas_main"}
      onClick={(e) => {
        props.addPoint(e);
      }}
      onMouseOver={() => {
        if (!props.openDetailsPreview) {
          props.setButtonFocus(false);
        }
      }}
      onTransitionEnd={() => {
        props.setRemovePoints(true);
      }}
    >
      {windowUpdated ? null : props.renderPaths()}
    </svg>
  );
};

export default Canvas;
