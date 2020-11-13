import Main from "./Components/Main/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Main />
      </div>
    </DndProvider>
  );
}

export default App;
