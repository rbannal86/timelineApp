import React, { useState, useEffect } from "react";

import "./Canvas.css";

const Canvas = (props) => {
  const [windowUpdated, setWindowUpdated] = useState(props.windowUpdated);

  useEffect(() => {
    if (props.windowUpdated !== windowUpdated) {
      setWindowUpdated(props.windowUpdated);
    }
  }, [props.windowUpdated, windowUpdated]);

  return (
    <svg
      className={"canvas_main"}
      id={"canvas_main"}
      onClick={(e) => {
        props.addPoint(e);
      }}
      onMouseOver={() => {
        if (!props.openDetailsPreview) {
          props.setButtonFocus(false);
        }
      }}
    >
      {windowUpdated ? null : props.renderPaths()}
    </svg>
  );
};

export default Canvas;
