import { Provider } from "react-redux";
import { store } from "./store/store";
import GraphContainer from "./components/GraphContainer";
import NodeCustomizationPanel from "./components/NodeCustomizationPanel";
import UndoRedoControls from "./components/UndoRedoControls";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1 className="app-title">Graph Visualization</h1>
        <div className="container">
          <div className="graph-container">
            <GraphContainer />
          </div>
          <div className="sidebar">
            <div className="controls">
              <UndoRedoControls />
            </div>
            <NodeCustomizationPanel />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
