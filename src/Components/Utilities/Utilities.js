import "./Utilities.css";

export default function Utilities(props) {
  return (
    <div className={"utilities_main"}>
      <button onClick={() => props.showPath()}>Show Path</button>
      <button onClick={() => props.undoLastMove()}>Undo Last Move</button>
      <button onClick={() => props.deleteLastPoint()}>Delete Last Point</button>
      <button onClick={() => props.setScreenLock(!props.screenLock)}>
        Disable Add Points
      </button>
    </div>
  );
}
