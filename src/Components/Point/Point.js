import React from "react";

import { useDrag } from "react-dnd";
import { ItemTypes } from "../../Service/dndItemTypes";

import "./Point.css";

const Point = React.memo((props) => {
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
  };

  if (props.index === props.movingPoint && props.buttonFocus) {
    styleObj = {
      ...styleObj,
      // width: "30px",
      // height: "30px",
      transform: "scale(1.5)",
      marginTop: "-10px",
      marginLeft: "-10px",
      backgroundColor: "red",
      zIndex: 2,
    };
  }

  return (
    <button
      ref={drag}
      className={"point_main"}
      style={styleObj}
      id={"point" + props.index}
      onClick={() => {
        // props.setOpenPointDetails(true);
        // props.setFadeOutDetails(true);
        if (props.movingPoint === props.index)
          props.setOpenDetailsPreview(!props.openDetailsPreview);
      }}
      onMouseOver={() => {
        pointSelect(props.index);
        props.setButtonFocus(true);
      }}
      onTouchStart={() => pointSelect(props.index)}
    />
  );
});

export default Point;
