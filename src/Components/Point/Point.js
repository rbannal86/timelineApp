import React, { useEffect, useState } from "react";

import { useDrag } from "react-dnd";
import { ItemTypes } from "../../Service/dndItemTypes";

import "./Point.css";

const Point = React.memo((props) => {
  const [renderClass, setRenderClass] = useState(null);

  useEffect(() => {
    if (props.removePoints && !renderClass) {
      setRenderClass("point_removed");
    }
  }, [props.removePoints, renderClass]);

  let pointSelect = props.setMovingPoint;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.POINT },
    isDragging: () => {
      pointSelect = () => {};
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  let styleObj = {
    position: "absolute",
    top: props.canvasY * props.relativeY,
    left: props.canvasX * props.relativeX,
    opacity: isDragging ? 0.5 : 1,
    zIndex: 0,
    transition: "all 1s linear",
  };

  if (props.index === props.movingPoint && props.buttonFocus) {
    styleObj = {
      ...styleObj,
      transform: "scale(1.5)",
      marginTop: "-12px",
      marginLeft: "-12px",
      backgroundColor: "red",
      zIndex: 2,
    };
  }

  if (renderClass) {
    styleObj = {
      ...styleObj,
      top: 0,
      left: 0,
    };
  }

  return (
    <button
      ref={drag}
      className={"point_main "}
      style={styleObj}
      id={"point" + props.index}
      onClick={() => {
        if (props.movingPoint === props.index)
          props.setOpenDetailsPreview(!props.openDetailsPreview);
      }}
      onMouseOver={() => {
        pointSelect(props.index);
        props.setButtonFocus(true);
      }}
      onTouchStart={() => pointSelect(props.index)}
      onTransitionEnd={() => {
        if (props.removePoints) props.setShowSlideShowControls(true);
      }}
    />
  );
});

export default Point;
