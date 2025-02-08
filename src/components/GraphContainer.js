import { useCallback } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { updateNodePosition } from "../store/graphSlice";
import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";

const nodeTypes = {
  customNode: CustomNode,
};

function GraphContainer() {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.graph.nodes);
  const edges = useSelector((state) => state.graph.edges);

  // Use onNodeDragStop instead of onNodesChange
  const onNodeDragStop = useCallback(
    (event, node) => {
      dispatch(
        updateNodePosition({
          nodeId: node.id,
          position: node.position,
        })
      );
    },
    [dispatch]
  );

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default GraphContainer;
