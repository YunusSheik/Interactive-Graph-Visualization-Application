import { useSelector, useDispatch } from "react-redux";
import { HexColorPicker } from "react-colorful";
import { updateNodeColor, updateNodeFontSize } from "../store/graphSlice";

function NodeCustomizationPanel() {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.graph.selectedNode);
  const nodes = useSelector((state) => state.graph.nodes);

  const selectedNodeData = selectedNode
    ? nodes.find((node) => node.id === selectedNode)?.data
    : null;

  if (!selectedNode) {
    return (
      <div className="customization-panel">
        <p>Select a node to customize</p>
      </div>
    );
  }

  const handleColorChange = (color) => {
    dispatch(updateNodeColor({ nodeId: selectedNode, color }));
  };

  const handleFontSizeChange = (e) => {
    const fontSize = parseInt(e.target.value);
    dispatch(updateNodeFontSize({ nodeId: selectedNode, fontSize }));
  };

  return (
    <div className="customization-panel">
      <h3 className="panel-title">Node Customization</h3>

      <div className="control-group">
        <label className="control-label">Color</label>
        <HexColorPicker
          color={selectedNodeData?.color}
          onChange={handleColorChange}
        />
      </div>

      <div className="control-group">
        <label className="control-label">Font Size</label>
        <input
          type="range"
          min="12"
          max="24"
          value={selectedNodeData?.fontSize || 14}
          onChange={handleFontSizeChange}
          className="font-size-control"
        />
        <span className="font-size-value">{selectedNodeData?.fontSize}px</span>
      </div>
    </div>
  );
}

export default NodeCustomizationPanel;
