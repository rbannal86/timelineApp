import Main from "./Components/Main/Main";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import "./App.css";

function App() {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="App">
        <Main />
      </div>
    </DndProvider>
  );
}

export default App;
