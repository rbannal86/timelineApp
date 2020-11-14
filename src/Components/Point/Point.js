import { useDrag } from "react-dnd";
import { ItemTypes } from "../../Service/dndItemTypes";

import "./Point.css";

export default function Point(props) {
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
    // width: "20px",
    // height: "20px",
    // marginTop: "-10px",
    // marginLeft: "-10px",
    opacity: isDragging ? 0.5 : 1,
  };

  if (props.index === props.movingPoint && props.buttonFocus) {
    styleObj = {
      ...styleObj,
      width: "30px",
      height: "30px",
      marginTop: "-15px",
      marginLeft: "-15px",
      backgroundColor: "red",
    };
  }

  // let openDetailsTimeout = setTimeout(
  //   () => props.setOpenPointDetails(false),
  //   1000
  // );

  // let stopOpenDetailsTimeout = () => window.clearTimeout(openDetailsTimeout);

  return (
    <button
      ref={drag}
      className={"point_main"}
      style={styleObj}
      id={"point" + props.index}
      onMouseOver={() => {
        pointSelect(props.index);
        props.setOpenPointDetails(true);
        props.setFadeOutDetails(true);
        props.setButtonFocus(true);
      }}
      onTouchStart={() => pointSelect(props.index)}
    />
  );
}
