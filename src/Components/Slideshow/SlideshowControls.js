import { useEffect, useState } from "react";

import "./SlideshowControls.css";

export default function SlideshowControls(props) {
  const [showElement, setShowElement] = useState(null);
  const [buttonPage, setButtonPage] = useState(0);
  const [currentButtons, setCurrentButtons] = useState();

  useEffect(() => {
    if (!currentButtons)
      setCurrentButtons(
        props.points.slice(buttonPage * 10, (buttonPage + 1) * 10)
      );
  }, [buttonPage, currentButtons, props.points]);

  console.log(currentButtons);

  let styleObj = {
    width: "0",
    margin: "auto",
    height: "10vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    position: "absolute",
    transition: "width 1s",
    bottom: "0",
    left: "0",
    visibility: "hidden",
  };

  if (showElement)
    styleObj = { ...styleObj, width: "100%", visibility: "visible" };

  const renderButtons = () => {
    console.log("renderbuttons");
    return currentButtons.map((point, index) => {
      if (!showElement)
        setTimeout(() => {
          console.log("expand");
          setShowElement(true);
        }, 1000);
      if (currentButtons[index]) {
        return (
          <button key={index} className="slide_show_controls_button">
            O
          </button>
        );
      } else return null;
    });
  };
  return (
    <div style={styleObj} className={"slide_show_controls_main "}>
      <div className="slide_show_controls_play">
        <button>Pause</button>
        <button>Play</button>
        <button>Exit</button>
      </div>
      <div className="slide_show_controls_points">
        <button
          disabled={buttonPage === 0 ? true : false}
          onClick={() => {
            setCurrentButtons(null);
            setButtonPage(buttonPage - 1);
          }}
        >{`<`}</button>
        {currentButtons ? renderButtons() : null}
        <button
          disabled={(buttonPage + 1) * 10 >= props.points.length}
          onClick={() => {
            setCurrentButtons(null);
            setButtonPage(buttonPage + 1);
          }}
        >{`>`}</button>
      </div>
    </div>
  );
}
