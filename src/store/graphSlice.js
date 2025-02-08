import { createSlice } from "@reduxjs/toolkit";

// Generate initial node positions
const initialNodes = Array.from({ length: 10 }, (_, i) => ({
  id: `node-${i}`,
  // Ensure positions are always defined and within view
  position: {
    x: 100 + (i % 3) * 200,
    y: 100 + Math.floor(i / 3) * 150,
  },
  data: {
    label: `Node ${i}`,
    color: "#ffffff",
    fontSize: 14,
  },
  type: "customNode",
}));

// Generate initial edges
const initialEdges = Array.from({ length: 15 }, (_, i) => {
  const source = Math.floor(i / 2);
  const target = (source + 1 + Math.floor(Math.random() * 8)) % 10;
  return {
    id: `edge-${i}`,
    source: `node-${source}`,
    target: `node-${target}`,
    type: "smoothstep",
  };
});

const initialState = {
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  past: [],
  present: { nodes: initialNodes, edges: initialEdges },
  future: [],
};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    updateNodeColor: (state, action) => {
      const { nodeId, color } = action.payload;
      const node = state.nodes.find((node) => node.id === nodeId);
      if (!node) return;

      state.past.push({
        type: "UPDATE_COLOR",
        payload: {
          nodeId,
          prevColor: node.data.color,
          color,
        },
      });
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, color } } : node
      );
      state.future = [];
    },
    updateNodeFontSize: (state, action) => {
      const { nodeId, fontSize } = action.payload;
      const node = state.nodes.find((node) => node.id === nodeId);
      if (!node) return;

      state.past.push({
        type: "UPDATE_FONT_SIZE",
        payload: {
          nodeId,
          prevFontSize: node.data.fontSize,
          fontSize,
        },
      });
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, fontSize } }
          : node
      );
      state.future = [];
    },
    updateNodePosition: (state, action) => {
      const { nodeId, position } = action.payload;
      const node = state.nodes.find((node) => node.id === nodeId);
      if (
        !node ||
        !position ||
        typeof position.x !== "number" ||
        typeof position.y !== "number"
      )
        return;

      state.past.push({
        type: "UPDATE_POSITION",
        payload: {
          nodeId,
          prevPosition: { ...node.position },
          position: { ...position },
        },
      });
      state.nodes = state.nodes.map((node) =>
        node.id === nodeId ? { ...node, position: { ...position } } : node
      );
      state.future = [];
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    undo: (state) => {
      if (state.past.length === 0) return;

      const lastAction = state.past[state.past.length - 1];
      state.future.unshift(lastAction);

      switch (lastAction.type) {
        case "UPDATE_COLOR":
          state.nodes = state.nodes.map((node) =>
            node.id === lastAction.payload.nodeId
              ? {
                  ...node,
                  data: { ...node.data, color: lastAction.payload.prevColor },
                }
              : node
          );
          break;
        case "UPDATE_FONT_SIZE":
          state.nodes = state.nodes.map((node) =>
            node.id === lastAction.payload.nodeId
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    fontSize: lastAction.payload.prevFontSize,
                  },
                }
              : node
          );
          break;
        case "UPDATE_POSITION":
          state.nodes = state.nodes.map((node) =>
            node.id === lastAction.payload.nodeId
              ? { ...node, position: { ...lastAction.payload.prevPosition } }
              : node
          );
          break;
      }

      state.past.pop();
    },
    redo: (state) => {
      if (state.future.length === 0) return;

      const nextAction = state.future[0];
      state.past.push(nextAction);

      switch (nextAction.type) {
        case "UPDATE_COLOR":
          state.nodes = state.nodes.map((node) =>
            node.id === nextAction.payload.nodeId
              ? {
                  ...node,
                  data: { ...node.data, color: nextAction.payload.color },
                }
              : node
          );
          break;
        case "UPDATE_FONT_SIZE":
          state.nodes = state.nodes.map((node) =>
            node.id === nextAction.payload.nodeId
              ? {
                  ...node,
                  data: { ...node.data, fontSize: nextAction.payload.fontSize },
                }
              : node
          );
          break;
        case "UPDATE_POSITION":
          state.nodes = state.nodes.map((node) =>
            node.id === nextAction.payload.nodeId
              ? { ...node, position: { ...nextAction.payload.position } }
              : node
          );
          break;
      }

      state.future.shift();
    },
  },
});

export const {
  updateNodeColor,
  updateNodeFontSize,
  updateNodePosition,
  setSelectedNode,
  undo,
  redo,
} = graphSlice.actions;

export default graphSlice.reducer;
