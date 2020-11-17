import React, { useState, useEffect } from "react";

import "./Canvas.css";

const Canvas = React.forwardRef((props, ref) => {
  const [windowUpdated, setWindowUpdated] = useState(props.windowUpdated);

  console.log(ref);

  useEffect(() => {
    if (props.windowUpdated !== windowUpdated) {
      setWindowUpdated(props.windowUpdated);

      console.log("window updated");
    }
  }, [props.windowUpdated, windowUpdated]);

  return (
    <svg
      ref={ref}
      className={"canvas_main"}
      id={"canvas_main"}
      onClick={(e) => {
        props.addPoint(e);
      }}
      onMouseOver={() => {
        if (props.openDetailsPreview) {
          console.log("no button focus");
          props.setButtonFocus(false);
        }
      }}
    >
      {windowUpdated ? null : props.renderPaths()}
    </svg>
  );
});

export default Canvas;
